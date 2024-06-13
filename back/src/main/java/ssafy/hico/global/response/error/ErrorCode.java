package ssafy.hico.global.response.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 예시. 필요한 것 추가해서 사용*/
    TEST_NOT_FOUND(HttpStatus.NOT_FOUND, "전달할 메시지"),

    //회원 관련 예외
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),
    NOT_FOUND_CODE(HttpStatus.NOT_FOUND, "존재하는 초대 코드가 없습니다."),
    ONLY_ACCESS_PARENT(HttpStatus.BAD_REQUEST, "부모님만 접근할 수 있는 페이지입니다."),
    ONLY_ACCESS_CHILD(HttpStatus.BAD_REQUEST, "아이만 접근할 수 있는 페이지입니다."),
    NON_MEMBER_ACCESS(HttpStatus.UNAUTHORIZED, "로그인 후 이용 가능합니다."),
    NOT_FOUND_USER(HttpStatus.NOT_FOUND, "해당 이메일로 가입한 유저가 없습니다."),
    INVALID_PASSWORD(HttpStatus.CONFLICT, "비밀번호가 일치하지 않습니다."),
    NOT_FOUND_ACCOUNT(HttpStatus.NOT_FOUND, "등록된 계좌가 없습니다."),
    NOT_ENOUGH_BALANCE(HttpStatus.BAD_REQUEST, "잔액이 부족합니다."),
    ALREADY_HAVE_ACCOUNT(HttpStatus.CONFLICT, "이미 계좌가 존재합니다."),
    NOT_FOUND_POINT(HttpStatus.NOT_FOUND, "포인트가 존재하지 않습니다."),

    //JWT 관련 예외
    EXPIRED_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),
    NOT_FOUND_AUTH_TOKEN(HttpStatus.BAD_REQUEST, "토큰 정보가 없습니다."),
    INVALID_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "권한 정보가 없는 토큰입니다."),

    //환율 관련 예외
    NOT_FOUND_EXCHANGE_RATE(HttpStatus.NOT_FOUND, "환율 정보가 존재하지 않습니다."),

    //나라 관련 예외
    NOT_FOUND_COUNTRY(HttpStatus.NOT_FOUND, "나라 정보가 존재하지 않습니다."),

    //스테이지 관련 예외
    NOT_FOUND_STAGE(HttpStatus.NOT_FOUND, "스테이지 정보가 존재하지 않습니다."),
    NOT_FOUND_STAGE_STATUS(HttpStatus.NOT_FOUND, "스테이지 상태가 존재하지 않습니다."),

    //퀴즈 관련 예외
    NOT_FOUND_QUIZ(HttpStatus.NOT_FOUND, "퀴즈 정보가 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
