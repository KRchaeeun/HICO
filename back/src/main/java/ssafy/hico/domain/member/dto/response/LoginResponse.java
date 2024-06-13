package ssafy.hico.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import ssafy.hico.domain.member.entity.Role;
import ssafy.hico.global.jwt.TokenResponse;

@Data
@Builder
@AllArgsConstructor
public class LoginResponse {
    private TokenResponse tokenResponse;
    private boolean isAccount;
    private String name;
    private Role role;
}
