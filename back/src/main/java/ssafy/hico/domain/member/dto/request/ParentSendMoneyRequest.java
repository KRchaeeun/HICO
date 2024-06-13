package ssafy.hico.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ParentSendMoneyRequest {
    private Long frTranId;
    private String password;
}
