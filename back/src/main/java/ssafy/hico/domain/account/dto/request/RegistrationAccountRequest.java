package ssafy.hico.domain.account.dto.request;

import lombok.Data;

@Data
public class RegistrationAccountRequest {
    private String accountNo;
    private String password;

}
