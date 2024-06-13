package ssafy.hico.global.bank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BankErrorResponse {
    private String responseCode;
    private String responseMessage;
}
