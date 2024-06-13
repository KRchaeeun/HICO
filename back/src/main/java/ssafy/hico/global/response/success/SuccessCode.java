package ssafy.hico.global.response.success;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessCode {
    //기본
    OK(HttpStatus.OK, "OK"),

    //생성 완료
    CREATED(HttpStatus.CREATED, "CREATED");

    private final HttpStatus httpStatus;
    private final String message;

}