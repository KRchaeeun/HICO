package ssafy.hico.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BankMemberSearchRequest {
    private String userId;
    private String apiKey;
}
