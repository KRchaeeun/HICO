package ssafy.hico.domain.account.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.global.bank.dto.request.Header;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InquireAccountTransactionRequest {

    @JsonProperty("Header")
    private Header Header;

    private String bankCode;
    private String accountNo;
    private String  startDate;
    private String endDate;
    private String transactionType;
    private String orderByType;
}
