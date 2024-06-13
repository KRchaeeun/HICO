package ssafy.hico.global.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;
import ssafy.hico.domain.member.entity.Role;

@Data
@AllArgsConstructor
public class AuthInfo {
    private Long memberId;
    private Role role;
}