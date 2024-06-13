package ssafy.hico.global.response.error.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.global.response.error.ErrorCode;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CustomException extends RuntimeException{
    ErrorCode errorCode;
}