package ssafy.hico.domain.member.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.hico.domain.member.service.ChildService;
import ssafy.hico.global.annotation.LoginOnly;
import ssafy.hico.global.response.success.SuccessCode;
import static ssafy.hico.global.response.success.CommonResponseEntity.getResponseEntity;


@RestController
@RequestMapping("/child")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;

    @GetMapping("/wallet")
    @LoginOnly(level = LoginOnly.Level.CHILD)
    public ResponseEntity<?> getChildAccountInfo(HttpServletRequest httpServletRequest){
        Long memberId = (Long) httpServletRequest.getAttribute("memberId");
        return getResponseEntity(SuccessCode.OK, childService.findChildAccount(memberId));
    }


}
