package ssafy.hico.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BankMemberCreateRequest {
    private String apiKey;
    private String userId;
}
