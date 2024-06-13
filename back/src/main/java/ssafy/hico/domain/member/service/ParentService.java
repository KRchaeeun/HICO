package ssafy.hico.domain.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ssafy.hico.domain.account.entity.Account;
import ssafy.hico.domain.account.repository.AccountRepository;
import ssafy.hico.domain.account.service.AccountService;
import ssafy.hico.domain.country.entity.Country;
import ssafy.hico.domain.country.repository.CountryRepository;
import ssafy.hico.domain.member.dto.request.ParentAccountTransferRequest;
import ssafy.hico.domain.member.dto.request.ParentSendMoneyRequest;
import ssafy.hico.domain.member.dto.response.AccountBalanceResponse;
import ssafy.hico.domain.member.dto.response.ChildInfoResponse;
import ssafy.hico.domain.member.dto.response.ChildPointResponse;
import ssafy.hico.domain.member.dto.response.ChildQuizStatusResponse;
import ssafy.hico.domain.member.entity.Member;
import ssafy.hico.domain.member.repository.MemberRepository;
import ssafy.hico.domain.quiz.entity.Quiz;
import ssafy.hico.domain.quiz.entity.QuizStatus;
import ssafy.hico.domain.quiz.repository.QuizRepository;
import ssafy.hico.domain.quiz.repository.QuizStatusRepository;
import ssafy.hico.domain.stage.dto.response.ProgressRate;
import ssafy.hico.domain.stage.entity.StageStatus;
import ssafy.hico.domain.stage.repository.StageStatusRepository;
import ssafy.hico.domain.transaction.dto.response.ChildForeignTransactionResponse;
import ssafy.hico.domain.transaction.dto.response.AccountAndFrTranResponse;
import ssafy.hico.domain.transaction.entity.FrTransaction;
import ssafy.hico.domain.transaction.repository.FrTransactionRepository;

import ssafy.hico.domain.wallet.entity.FrWallet;
import ssafy.hico.domain.wallet.repository.FrWalletRepository;
import ssafy.hico.global.bank.BankApi;
import ssafy.hico.global.bank.BankApiClient;
import ssafy.hico.global.bank.dto.request.Header;
import ssafy.hico.global.response.error.ErrorCode;
import ssafy.hico.global.response.error.exception.CustomException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParentService {

    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final ChildService childService;
    private final FrTransactionRepository frTransactionRepository;
    private final FrWalletRepository frWalletRepository;
    private final AccountRepository accountRepository;
    private final CountryRepository countryRepository;
    private final QuizRepository quizRepository;
    private final StageStatusRepository stageStatusRepository;
    private final QuizStatusRepository quizStatusRepository;
    private final AccountService accountService;
    private final BankApiClient bankApiClient;

    public AccountAndFrTranResponse findParentAccount(Long memberId) {

        List<Long> childIds = memberRepository.findIdsByParentId(memberId);
        List<FrTransaction> transactions = frTransactionRepository.findByChildMemberIds(childIds);
        List<ChildForeignTransactionResponse> list = childService.changeFrTranToChildFrTran(transactions);

        AccountBalanceResponse accountBalanceResponse = accountService.getAccountBalance(memberId);
        return AccountAndFrTranResponse.builder()
                .accountNo(accountBalanceResponse.getREC().getAccountNo())
                .balance(accountBalanceResponse.getREC().getAccountBalance())
                .frTranList(list).build();
    }

    public List<ChildForeignTransactionResponse> findChildExchangeRequestList(Long memberId) {
        List<Long> childIds = memberRepository.findIdsByParentId(memberId);
        List<FrTransaction> transactions = frTransactionRepository.findByChildMemberIdsAndNotTransacted(childIds, PageRequest.of(0, 5));

        return childService.changeFrTranToChildFrTran(transactions);
    }

    @Transactional
    public void confirmAndSendExchangeToChild(Long memberId, ParentSendMoneyRequest request) {
        Account account = accountRepository.findByMemberId(memberId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ACCOUNT));
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if(!encoder.matches(request.getPassword(), account.getPassword())) {
            throw new CustomException(ErrorCode.INVALID_PASSWORD);
        }

        FrTransaction frTransaction = frTransactionRepository.findById(request.getFrTranId()).get();
        Member child = frTransaction.getFrWallet().getMember();
        Account childAccount = accountRepository.findByMemberId(child.getId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ACCOUNT));
        Header header = bankApiClient.makeHeader(BankApi.ACCOUNT_TRANSFER.getApiName(), account.getMember().getUserKey());

        BigDecimal balance = frTransaction.getBalance().setScale(0, BigDecimal.ROUND_DOWN);
        ParentAccountTransferRequest requestBody = ParentAccountTransferRequest.builder().header(header)
                .depositBankCode(childAccount.getBankCode())
                .depositAccountNo(childAccount.getAccountNo())
                .transactionBalance(balance)
                .withdrawalBankCode(account.getBankCode())
                .withdrawalAccountNo(account.getAccountNo()).build();

        bankApiClient.getResponse(BankApi.ACCOUNT_TRANSFER.getUrl(), requestBody);

        //입금 성공 후 거래 내역 상태 변화
        frTransactionRepository.updateIsTransacted(request.getFrTranId());

    }

    public String findInvitationCode(Long memberId) {
        return memberService.findById(memberId).getInvitationCode();
    }

    public List<ChildInfoResponse> findChildren(Long memberId) {
        List<Member> children = memberRepository.findByParentId(memberId);
        return children.stream()
                .map(child -> new ChildInfoResponse(child.getId(), child.getName()))
                .collect(Collectors.toList());
    }

    public List<ChildPointResponse> findChildPoint(Long childId) {
        FrWallet frWallet = frWalletRepository.findByMemberId(childId).get();
        return frWallet.getFrPoints().stream()
                .map(frPoint -> new ChildPointResponse(frPoint.getFrPointId(),
                        frPoint.getCountry().getId(),
                        frPoint.getCountry().getCountryName(),
                        frPoint.getCountry().getCode(),
                        frPoint.getCountry().getFrType(),
                        frPoint.getBalance()))
                .collect(Collectors.toList());
    }

    public List<ChildQuizStatusResponse> findChildQuizStatus(Long childId) {
        List<Country> countries = countryRepository.findByIdBetween(1L, 4L);
        List<ChildQuizStatusResponse> responses = new ArrayList<>();

        for (Country country : countries) {
            List<Quiz> quizzes = quizRepository.findByQuizLevel_Country_Id(country.getId());
            List<Long> quizIds = quizzes.stream().map(Quiz::getId).collect(Collectors.toList());
            List<QuizStatus> correctQuizStatuses = quizStatusRepository.findByMember_IdAndQuiz_IdInAndIsCorrectTrue(childId, quizIds);

            // 스테이지 통과 상태에 따른 진행률 계산
            List<StageStatus> stageStatuses = stageStatusRepository.findAllByMemberIdAndStage_Country_Id(childId, country.getId());
            int progressRate = (int) stageStatuses.stream().filter(StageStatus::isPassed).count() * 20;

            responses.add(new ChildQuizStatusResponse(
                    country.getId(),
                    country.getCountryName(),
                    country.getCode(),
                    progressRate,
                    correctQuizStatuses.size()  // 해당 나라에 대해 정답을 맞춘 퀴즈의 수
            ));
        }

        return responses;
    }
}
