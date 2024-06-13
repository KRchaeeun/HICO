package ssafy.hico.domain.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.hico.domain.account.repository.AccountRepository;
import ssafy.hico.domain.country.entity.Country;
import ssafy.hico.domain.country.repository.CountryRepository;
import ssafy.hico.domain.member.dto.request.BankMemberCreateRequest;
import ssafy.hico.domain.member.dto.request.BankMemberSearchRequest;
import ssafy.hico.domain.member.dto.request.MemberLoginRequest;
import ssafy.hico.domain.member.dto.request.MemberSignUpRequest;
import ssafy.hico.domain.member.dto.response.BankMemberSearchResponse;
import ssafy.hico.domain.member.dto.response.LoginResponse;
import ssafy.hico.domain.member.entity.Member;
import ssafy.hico.domain.member.entity.Role;
import ssafy.hico.domain.member.repository.MemberRepository;
import ssafy.hico.domain.point.entity.FrPoint;
import ssafy.hico.domain.point.repository.FrPointRepository;
import ssafy.hico.domain.wallet.entity.FrWallet;
import ssafy.hico.domain.wallet.repository.FrWalletRepository;
import ssafy.hico.global.bank.BankApi;
import ssafy.hico.global.bank.BankApiClient;
import ssafy.hico.global.bank.BankProperties;
import ssafy.hico.global.jwt.JwtTokenProvider;
import ssafy.hico.global.jwt.TokenResponse;
import ssafy.hico.global.response.error.ErrorCode;
import ssafy.hico.global.response.error.exception.BankException;
import ssafy.hico.global.response.error.exception.CustomException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final AccountRepository accountRepository;
    private final FrWalletRepository frWalletRepository;
    private final CountryRepository countryRepository;
    private final FrPointRepository frPointRepository;
    private final BankProperties bankProperties;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final BankApiClient bankApiClient;
    private final JwtTokenProvider jwtTokenProvider;

    public void memberSignUp(MemberSignUpRequest request) {
        if(memberRepository.findByEmail(request.getEmail()).isPresent()){
            throw new CustomException(ErrorCode.DUPLICATE_EMAIL);
        }

        try {
            String memberSearchUrl = BankApi.MEMBER_SEARCH.getUrl();
            BankMemberSearchRequest requestBody = new BankMemberSearchRequest(request.getEmail(), bankProperties.getApiKey());
            String response = bankApiClient.getResponse(memberSearchUrl, requestBody);

            BankMemberSearchResponse memberSearchResponse = bankApiClient.getDtoFromResponse(response, BankMemberSearchResponse.class);
            createMember(request, memberSearchResponse.getPayload().getUserKey()); // 계정이 있으면 멤버 생성
        } catch (BankException e) {
            if ("E4003".equals(e.getCode())) {
                BankMemberCreateRequest bankMemberCreateRequest = new BankMemberCreateRequest(bankProperties.getApiKey(), request.getEmail());
                String response = bankApiClient.getResponse(BankApi.MEMBER_CREATE.getUrl(), bankMemberCreateRequest);
                BankMemberSearchResponse memberSearchResponse = bankApiClient.getDtoFromResponse(response, BankMemberSearchResponse.class);
                createMember(request, memberSearchResponse.getPayload().getUserKey()); // 계정이 있으면 멤버 생성
            } else {
                throw new BankException(e.getCode(), e.getMessage());
            }
        }
    }

    private void createMember(MemberSignUpRequest request, String userKey) {
        String encryptPassword = bCryptPasswordEncoder.encode(request.getPassword());

        Member.MemberBuilder builder = Member.builder()
                .email(request.getEmail())
                .password(encryptPassword)
                .gender(request.getGender())
                .name(request.getName())
                .role(request.getRole())
                .birthDate(request.getBirthDate())
                .userKey(userKey);

        if (request.getRole() == Role.CHILD) {
            Member parent = memberRepository.findByInvitationCode(request.getCode())
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CODE));
            builder.parent(parent);
        } else if (request.getRole() == Role.PARENT) {
            builder.invitationCode(makeRandomCode());
        }

        Member member = memberRepository.save(builder.build());

        if(request.getRole() == Role.CHILD){
            setChildFrWallet(member);
        }
    }

    private void setChildFrWallet(Member member) {
        FrWallet frWallet = FrWallet.builder()
                .member(member).build();
        frWalletRepository.save(frWallet);

        List<Country> countries = countryRepository.findByIdBetween(1, 4);
        for (Country country : countries) {
            FrPoint frPoint = FrPoint.builder()
                    .country(country)
                    .frWallet(frWallet)
                    .balance(BigDecimal.ZERO).build();
            frPointRepository.save(frPoint);
        }
    }


    @Transactional
    public LoginResponse login(MemberLoginRequest request) {
        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if(encoder.matches(request.getPassword(), member.getPassword())) {
            TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getId(), member.getRole());
            memberRepository.updateRefreshToken(member.getId(), tokenResponse.getRefreshToken());

            Boolean isAccount = accountRepository.findByMember(member).isPresent() ? true : false;
            return LoginResponse.builder()
                    .tokenResponse(tokenResponse)
                    .isAccount(isAccount)
                    .name(member.getName())
                    .role(member.getRole())
                    .build();
        } else {
            throw new CustomException(ErrorCode.INVALID_PASSWORD);
        }
    }

    @Transactional
    public TokenResponse recreateToken(String bearerToken) {
        String refreshToken = jwtTokenProvider.getToken(bearerToken);
        jwtTokenProvider.validateToken(refreshToken);

        Long memberId = jwtTokenProvider.getMemberIdFromToken(refreshToken);
        Member member = memberRepository.findById(memberId).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER));

        TokenResponse tokenResponse = jwtTokenProvider.createToken(memberId, member.getRole());
        memberRepository.updateRefreshToken(memberId, tokenResponse.getRefreshToken());

        return tokenResponse;
    }


    public String makeRandomCode(){
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        // 문자를 위한 문자열
        String letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // 숫자 3개 추가
        for (int i = 0; i < 3; i++) {
            int digit = random.nextInt(10);
            code.append(digit);
        }

        // 문자 3개 추가
        for (int i = 0; i < 3; i++) {
            int index = random.nextInt(letters.length());
            code.append(letters.charAt(index));
        }

        char[] characters = code.toString().toCharArray();
        for (int i = 0; i < characters.length; i++) {
            int randomIndex = random.nextInt(characters.length);
            char temp = characters[i];
            characters[i] = characters[randomIndex];
            characters[randomIndex] = temp;
        }
        return new String(characters);
    }

    public Member findById(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
    }

    @Transactional
    public void logout(Long memberId) {
        String refreshToken = findById(memberId).getRefreshToken();
        jwtTokenProvider.validateToken(refreshToken);
        memberRepository.updateRefreshToken(memberId, null);
    }
}
