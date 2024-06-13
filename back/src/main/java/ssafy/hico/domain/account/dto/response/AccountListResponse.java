package ssafy.hico.domain.account.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class AccountListResponse {

    @JsonProperty("REC")
    private List<RecResponse> REC;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecResponse {
        @JsonProperty("bankCode")
        private String bankCode;

        @JsonProperty("bankName")
        private String bankName;

        @JsonProperty("userName")
        private String userName;

        @JsonProperty("accountNo")
        private String accountNo;

        @JsonProperty("accountName")
        private String accountName;

        @JsonProperty("accountTypeCode")
        private String accountTypeCode;

        @JsonProperty("accountTypeName")
        private String accountTypeName;

        @JsonProperty("accountCreatedDate")
        private String accountCreatedDate;

        @JsonProperty("accountExpiryDate")
        private String accountExpiryDate;

        @JsonProperty("dailyTransferLimit")
        private String dailyTransferLimit;

        @JsonProperty("oneTimeTransferLimit")
        private String oneTimeTransferLimit;

        @JsonProperty("accountBalance")
        private String accountBalance;

        @JsonIgnore
        private String lastTransactionDate;
    }

}
