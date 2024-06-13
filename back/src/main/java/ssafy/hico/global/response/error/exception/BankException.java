package ssafy.hico.global.response.error.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class BankException extends RuntimeException{
    String code;
    String message;
}
