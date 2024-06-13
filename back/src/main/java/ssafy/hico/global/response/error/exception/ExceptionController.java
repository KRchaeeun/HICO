package ssafy.hico.global.response.error.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ssafy.hico.global.response.error.ErrorResponseEntity;


@RestControllerAdvice
public class ExceptionController {
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponseEntity> ExceptionHandler(CustomException e) {
        return ErrorResponseEntity.toResponseEntity(e.getErrorCode());
    }

    @ExceptionHandler(BankException.class)
    public ResponseEntity<ErrorResponseEntity> ExceptionHandler(BankException e) {
        return ErrorResponseEntity.toResponseEntity(e.getCode(), e.getMessage());
    }
}
