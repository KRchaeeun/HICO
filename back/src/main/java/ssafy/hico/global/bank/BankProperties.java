package ssafy.hico.global.bank;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ConfigurationProperties(prefix = "ssafy.bank")
public class BankProperties {
    private String managerId;
    private String apiKey;
    private String accountTypeUniqueNo;
    private String institutionCode;
    private String fintechAppNo;
    private String bankName;
    private String code;
}
