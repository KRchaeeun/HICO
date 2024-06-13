package ssafy.hico.global.response.error;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
@Data
@Builder
public class ErrorResponseEntity {
    private int statusCode; //HttpStatusCode
    private String statusName; //HttpStatus Name
    private String message; //Custom message

    public static ResponseEntity<ErrorResponseEntity> toResponseEntity(ErrorCode ec) {
        return ResponseEntity
                .status(ec.getHttpStatus())
                .body(ErrorResponseEntity.builder()
                        .statusCode(ec.getHttpStatus().value())
                        .statusName(ec.name())
                        .message(ec.getMessage())
                        .build());
    }

    public static ResponseEntity<ErrorResponseEntity> toResponseEntity(String code, String message) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponseEntity.builder()
                        .statusCode(HttpStatus.BAD_REQUEST.value())
                        .statusName(code)
                        .message(message)
                        .build());
    }
}
