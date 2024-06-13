package ssafy.hico.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.hico.domain.account.service.AccountService;
import ssafy.hico.domain.member.dto.response.AccountBalanceResponse;
import ssafy.hico.domain.transaction.dto.response.AccountAndFrTranResponse;
import ssafy.hico.domain.transaction.dto.response.ChildForeignTransactionResponse;
import ssafy.hico.domain.transaction.entity.FrTransaction;
import ssafy.hico.domain.transaction.repository.FrTransactionRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChildService {

    private final AccountService accountService;
    private final FrTransactionRepository frTransactionRepository;


    public AccountAndFrTranResponse findChildAccount(Long memberId) {

        AccountBalanceResponse accountBalanceResponse = accountService.getAccountBalance(memberId);
        List<FrTransaction> transactions = frTransactionRepository.findByChildId(memberId);

        List<ChildForeignTransactionResponse> list = changeFrTranToChildFrTran(transactions);

        return AccountAndFrTranResponse.builder()
                .accountNo(accountBalanceResponse.getREC().getAccountNo())
                .balance(accountBalanceResponse.getREC().getAccountBalance())
                .frTranList(list).build();

    }

    static List<ChildForeignTransactionResponse> changeFrTranToChildFrTran(List<FrTransaction> transactions) {
        return transactions.stream()
                .map(transaction -> new ChildForeignTransactionResponse(
                        transaction.getId(),
                        transaction.getBalance(),
                        transaction.getCountry().getId(),
                        transaction.getFrBalance(),
                        transaction.getCountry().getCode(),
                        transaction.getCreateTime(),
                        transaction.getIsTransacted(),
                        transaction.getFrWallet().getMember().getId(),
                        transaction.getFrWallet().getMember().getName()
                ))
                .collect(Collectors.toList());
    }
}
