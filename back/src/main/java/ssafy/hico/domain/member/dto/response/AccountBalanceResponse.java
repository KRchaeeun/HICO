package ssafy.hico.domain.member.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccountBalanceResponse {
    @JsonProperty("REC")
    private RecResponse REC;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecResponse {
        @JsonProperty("bankCode")
        private String bankCode;

        @JsonProperty("accountNo")
        private String accountNo;

        @JsonProperty("accountCreatedDate")
        private String accountCreatedDate;

        @JsonProperty("accountExpiryDate")
        private String accountExpiryDate;

        @JsonProperty("accountBalance")
        private String accountBalance;

        @JsonIgnore
        private String lastTransactionDate;
    }
}
