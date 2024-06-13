package ssafy.hico.domain.member.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.global.response.error.ErrorCode;

@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL) // null이 아닌 값들만 포함
public class BankMemberSearchResponse {
    @JsonProperty("code")
    private String code;

    @JsonProperty("payload")
    private Payload payload;

    @Getter
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Payload {
        private String userId;
        private String username;
        private String institutionCode;
        private String userKey;
        private String created;
        private String modified;
    }
}
