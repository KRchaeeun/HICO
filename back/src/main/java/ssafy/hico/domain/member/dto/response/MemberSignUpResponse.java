package ssafy.hico.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberSignUpResponse {
    private String name;

    @Builder
    public MemberSignUpResponse(String name){
        this.name = name;
    }
}
