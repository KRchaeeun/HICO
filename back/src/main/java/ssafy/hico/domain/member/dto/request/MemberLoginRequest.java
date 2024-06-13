package ssafy.hico.domain.member.dto.request;

import lombok.Data;

@Data
public class MemberLoginRequest {
    private String email;
    private String password;

}
