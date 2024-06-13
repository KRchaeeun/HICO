package ssafy.hico.domain.account.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class InquireAccountTransactionResponse {

    @JsonProperty("REC") // This tells Jackson to map the REC key to this field
    private Rec rec;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Rec {
        private int totalCount;
        private List<TransactionItem> list;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class TransactionItem {
        private String transactionDate;
        private String transactionTime;
        private String transactionTypeName;
        private String transactionBalance;
        private String transactionAfterBalance;
    }
}
