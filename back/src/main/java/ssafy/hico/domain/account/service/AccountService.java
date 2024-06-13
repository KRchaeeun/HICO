package ssafy.hico.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ssafy.hico.domain.account.dto.request.InquireAccountTransactionRequest;
import ssafy.hico.domain.account.dto.request.MakeAccountRequest;
import ssafy.hico.domain.account.dto.request.OpenAccountRequest;
import ssafy.hico.domain.account.dto.request.RegistrationAccountRequest;
import ssafy.hico.domain.account.dto.response.AccountListResponse;
import ssafy.hico.domain.account.dto.response.InquireAccountTransactionResponse;
import ssafy.hico.domain.account.dto.response.OpenAccountResponse;
import ssafy.hico.domain.account.entity.Account;
import ssafy.hico.domain.account.repository.AccountRepository;
import ssafy.hico.domain.member.dto.request.BankAccountBalanceRequest;
import ssafy.hico.domain.member.dto.response.AccountBalanceResponse;
import ssafy.hico.domain.member.entity.Member;
import ssafy.hico.domain.member.service.MemberService;
import ssafy.hico.global.bank.BankApi;
import ssafy.hico.global.bank.BankApiClient;
import ssafy.hico.global.bank.BankProperties;
import ssafy.hico.global.bank.dto.request.Header;
import ssafy.hico.global.bank.dto.request.HeaderRequest;
import ssafy.hico.global.response.error.ErrorCode;
import ssafy.hico.global.response.error.exception.CustomException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final MemberService memberService;
    private final BankApiClient bankApiClient;
    private final BankProperties bankProperties;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AccountRepository accountRepository;


    public void makeAccount(Long memberId, MakeAccountRequest request) {
        if(accountRepository.findByMemberId(memberId).isPresent()){
            throw new CustomException(ErrorCode.ALREADY_HAVE_ACCOUNT);
        }
        Member member = memberService.findById(memberId);
        Header header = bankApiClient.makeHeader(BankApi.OPEN_ACCOUNT.getApiName(), member.getUserKey());

        OpenAccountRequest openAccountRequest = OpenAccountRequest.builder()
                .Header(header)
                .accountTypeUniqueNo(bankProperties.getAccountTypeUniqueNo())
                .build();

        String response = bankApiClient.getResponse(BankApi.OPEN_ACCOUNT.getUrl(), openAccountRequest);

        OpenAccountResponse openAccountResponse = bankApiClient.getDtoFromResponse(response, OpenAccountResponse.class);

        String encryptPassword = bCryptPasswordEncoder.encode(request.getPassword());
        Account account = Account.builder().member(member)
                .accountNo(openAccountResponse.getREC().getAccountNo())
                .password(encryptPassword)
                .bankCode(openAccountResponse.getREC().getBankCode())
                .bankName(bankProperties.getBankName()).build();

        accountRepository.save(account);
    }


    public AccountListResponse getAccountList(Long memberId) {
        Member member = memberService.findById(memberId);
        Header header = bankApiClient.makeHeader(BankApi.INQUIRE_ACCOUNT_LIST.getApiName(), member.getUserKey());
        String response = bankApiClient.getResponse(BankApi.INQUIRE_ACCOUNT_LIST.getUrl(), new HeaderRequest(header));

        return bankApiClient.getDtoFromResponse(response, AccountListResponse.class);
    }

    public void registrationAccount(Long memberId, RegistrationAccountRequest request) {
        if(accountRepository.findByMemberId(memberId).isPresent()){
            throw new CustomException(ErrorCode.ALREADY_HAVE_ACCOUNT);
        }
        Member member = memberService.findById(memberId);

        String encryptPassword = bCryptPasswordEncoder.encode(request.getPassword());
        Account account = Account.builder()
                .member(member)
                .accountNo(request.getAccountNo())
                .bankName(bankProperties.getBankName())
                .bankCode(bankProperties.getCode())
                .password(encryptPassword)
                .build();
        System.out.println(account.toString());
        accountRepository.save(account);
    }

    public AccountBalanceResponse getAccountBalance(Long memberId){
        Account account = findByMemberId(memberId);

        Header header = bankApiClient.makeHeader(BankApi.INQUIRE_ACCOUNT_BALANCE.getApiName(), account.getMember().getUserKey());
        BankAccountBalanceRequest request = new BankAccountBalanceRequest(header, account.getBankCode(), account.getAccountNo());
        String response = bankApiClient.getResponse(BankApi.INQUIRE_ACCOUNT_BALANCE.getUrl(), request);

        return bankApiClient.getDtoFromResponse(response, AccountBalanceResponse.class);
    }

    public Account findByMemberId(Long memberId) {
        return accountRepository.findByMemberId(memberId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ACCOUNT));
    }

    public InquireAccountTransactionResponse getAccountWithdraw(Long memberId) {
        Account account = findByMemberId(memberId);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String today = LocalDate.now().format(formatter);
        String oneWeekAgo = LocalDate.now().minusWeeks(5).format(formatter);
        System.out.println(today + " " + oneWeekAgo);
        Header header = bankApiClient.makeHeader(BankApi.INQUIRE_ACCOUNT_TRANSACTION_HISTORY.getApiName(), account.getMember().getUserKey());
        InquireAccountTransactionRequest request = InquireAccountTransactionRequest.builder().Header(header)
                .bankCode(bankProperties.getCode()).accountNo(account.getAccountNo()).startDate(oneWeekAgo).endDate(today)
                .transactionType("D").orderByType("DESC").build();

        String response = bankApiClient.getResponse(BankApi.INQUIRE_ACCOUNT_TRANSACTION_HISTORY.getUrl(), request);

        return bankApiClient.getDtoFromResponse(response, InquireAccountTransactionResponse.class);
    }
}
