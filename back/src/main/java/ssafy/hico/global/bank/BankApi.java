package ssafy.hico.global.bank;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BankApi {

    //계정 조회
    MEMBER_SEARCH("search", "https://finapi.p.ssafy.io/ssafy/api/v1/member/search"),

    //계정 생성
    MEMBER_CREATE("create", "https://finapi.p.ssafy.io/ssafy/api/v1/member/"),

    //계좌 생성
    OPEN_ACCOUNT("openAccount", "https://finapi.p.ssafy.io/ssafy/api/v1/edu/account/openAccount"),

    //계좌 목록 조회
    INQUIRE_ACCOUNT_LIST("inquireAccountList",
            "https://finapi.p.ssafy.io/ssafy/api/v1/edu/account/inquireAccountList"),

    //계좌 조회 단건
    INQUIRE_ACCOUNT_INFO("inquireAccountInfo",
            "https://finapi.p.ssafy.io/ssafy/api/v1/edu/account/inquireAccountInfo"),

    //예금주 조회
    INQUIRE_DEPOSITOR_ACCOUNT_NUMBER("inquireDepositorAccountNumber",
            "https://finapi.p.ssafy.io/ssafy/api/v1/edu/account/inquireDepositorAccountNumber"),

    //잔액 조회
    INQUIRE_ACCOUNT_BALANCE("inquireAccountBalance",
            "https://finapi.p.ssafy.io/ssafy/api/v1/edu/account/inquireAccountBalance"),

    //계좌 이체
    ACCOUNT_TRANSFER("accountTransfer" ,
            "https://finapi.p.ssafy.io/ssafy/api/v1/edu/account/accountTransfer"),

    //계좌 거래 내역 조회
    INQUIRE_ACCOUNT_TRANSACTION_HISTORY("inquireAccountTransactionHistory",
            "https://finapi.p.ssafy.io/ssafy/api/v1/edu/account/inquireAccountTransactionHistory"),

    //계좌 거래 내역 조회(단건)
    INQUIRE_TRANSACTION_HISTORY_DETAIL("inquireTransactionHistoryDetail",
            "https://finapi.p.ssafy.io/ssafy/api/v1/edu/account/inquireTransactionHistoryDetail");

    private final String apiName;
    private final String url;
}
