package ssafy.hico.domain.member.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import ssafy.hico.global.bank.dto.request.Header;

@Data
@AllArgsConstructor
public class BankAccountBalanceRequest {

    @JsonProperty("Header")
    private Header header;

    private String bankCode;
    private String accountNo;
}
