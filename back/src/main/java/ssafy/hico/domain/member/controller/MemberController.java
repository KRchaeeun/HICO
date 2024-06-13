package ssafy.hico.domain.member.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import ssafy.hico.domain.member.dto.request.MemberLoginRequest;
import ssafy.hico.domain.member.dto.request.MemberSignUpRequest;
import ssafy.hico.domain.member.service.MemberService;
import ssafy.hico.global.annotation.LoginOnly;
import ssafy.hico.global.response.success.SuccessCode;

import static ssafy.hico.global.response.success.CommonResponseEntity.getResponseEntity;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<?> memberSignUp(@RequestBody MemberSignUpRequest request){
        memberService.memberSignUp(request);
        return getResponseEntity(SuccessCode.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginRequest request){
        return getResponseEntity(SuccessCode.OK, memberService.login(request));
    }

    @PostMapping("/token")
    public ResponseEntity<?> recreateToken(@RequestHeader(value = "Authorization", required = false) String bearerToken){
        return getResponseEntity(SuccessCode.OK, memberService.recreateToken(bearerToken));
    }

    @PostMapping("/logout")
    @LoginOnly(level = LoginOnly.Level.ALL)
    public ResponseEntity<?> recreateToken(HttpServletRequest httpServletRequest){
        Long memberId = (Long) httpServletRequest.getAttribute("memberId");
        memberService.logout(memberId);
        return getResponseEntity(SuccessCode.OK);
    }


}
