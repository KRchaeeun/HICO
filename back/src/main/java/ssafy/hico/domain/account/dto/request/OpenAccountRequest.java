package ssafy.hico.domain.account.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.hico.global.bank.dto.request.Header;

@Getter
@Setter
@Builder
@ToString
public class OpenAccountRequest {
    @JsonProperty("Header")
    private Header Header;
    private String accountTypeUniqueNo;
}