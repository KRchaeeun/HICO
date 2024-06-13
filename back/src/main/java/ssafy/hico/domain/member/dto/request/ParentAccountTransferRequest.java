package ssafy.hico.domain.member.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import ssafy.hico.global.bank.dto.request.Header;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
public class ParentAccountTransferRequest {
    @JsonProperty("Header")
    Header header;
    private String depositBankCode;
    private String depositAccountNo;
    private BigDecimal transactionBalance;
    private String withdrawalBankCode;
    private String withdrawalAccountNo;
}
