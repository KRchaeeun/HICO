package ssafy.hico.domain.member.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.hico.domain.member.dto.request.ParentSendMoneyRequest;
import ssafy.hico.domain.member.service.ParentService;
import ssafy.hico.global.annotation.LoginOnly;
import ssafy.hico.global.response.success.SuccessCode;

import static ssafy.hico.global.response.success.CommonResponseEntity.getResponseEntity;

@RestController
@RequestMapping("/parent")
@RequiredArgsConstructor
public class ParentController {

    private final ParentService parentService;

    @GetMapping("/wallet")
    @LoginOnly(level = LoginOnly.Level.PARENT)
    public ResponseEntity<?> orderParentAccountInfo(HttpServletRequest httpServletRequest){
        Long memberId = (Long) httpServletRequest.getAttribute("memberId");
        return getResponseEntity(SuccessCode.OK, parentService.findParentAccount(memberId));
    }


    @GetMapping("/wallet/tran")
    @LoginOnly(level = LoginOnly.Level.PARENT)
    public ResponseEntity<?> getChildExchangeRequestList(HttpServletRequest httpServletRequest){
        Long memberId = (Long) httpServletRequest.getAttribute("memberId");
        return getResponseEntity(SuccessCode.OK, parentService.findChildExchangeRequestList(memberId));
    }

    @PostMapping("/wallet/tran")
    @LoginOnly(level = LoginOnly.Level.PARENT)
    public ResponseEntity<?> confirmAndSendExchangeToChild(HttpServletRequest httpServletRequest, @RequestBody ParentSendMoneyRequest request){
        Long memberId = (Long) httpServletRequest.getAttribute("memberId");
        parentService.confirmAndSendExchangeToChild(memberId, request);
        return getResponseEntity(SuccessCode.OK);
    }

    @GetMapping("/main/code")
    @LoginOnly(level = LoginOnly.Level.PARENT)
    public ResponseEntity<?> getInvitationCode(HttpServletRequest httpServletRequest){
        Long memberId = (Long) httpServletRequest.getAttribute("memberId");
        return getResponseEntity(SuccessCode.OK, parentService.findInvitationCode(memberId));
    }

    @GetMapping("/main")
    @LoginOnly(level = LoginOnly.Level.PARENT)
    public ResponseEntity<?> getChildren(HttpServletRequest httpServletRequest){
        Long memberId = (Long) httpServletRequest.getAttribute("memberId");
        return getResponseEntity(SuccessCode.OK, parentService.findChildren(memberId));
    }

    @GetMapping("/main/point/{childId}")
    @LoginOnly(level = LoginOnly.Level.PARENT)
    public ResponseEntity<?> getChildPoint(@PathVariable("childId") Long childId){
        return getResponseEntity(SuccessCode.OK, parentService.findChildPoint(childId));
    }

    @GetMapping("/main/{childId}")
    @LoginOnly(level = LoginOnly.Level.PARENT)
    public ResponseEntity<?> getChildQuizStatus(@PathVariable("childId") Long childId){
        return getResponseEntity(SuccessCode.OK, parentService.findChildQuizStatus(childId));
    }
}
