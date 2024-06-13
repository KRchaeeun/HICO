package ssafy.hico.domain.account.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.global.bank.dto.response.HeaderResponse;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenAccountResponse {
    @JsonProperty("Header")
    private HeaderResponse header;

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
    }
}
