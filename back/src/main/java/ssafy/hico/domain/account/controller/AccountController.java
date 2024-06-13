package ssafy.hico.domain.account.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.hico.domain.account.dto.request.MakeAccountRequest;
import ssafy.hico.domain.account.dto.request.RegistrationAccountRequest;
import ssafy.hico.domain.account.service.AccountService;
import ssafy.hico.global.annotation.LoginOnly;
import ssafy.hico.global.response.success.SuccessCode;

import static ssafy.hico.global.response.success.CommonResponseEntity.getResponseEntity;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @PostMapping("/make")
    @LoginOnly(level = LoginOnly.Level.ALL)
    public ResponseEntity<?> makeAccount(HttpServletRequest httpServletRequest, @RequestBody MakeAccountRequest request){
        Long memberId = (Long)httpServletRequest.getAttribute("memberId");
        accountService.makeAccount(memberId, request);
        return getResponseEntity(SuccessCode.CREATED);
    }

    @GetMapping
    @LoginOnly(level = LoginOnly.Level.ALL)
    public ResponseEntity<?> getAccountList(HttpServletRequest httpServletRequest){
        Long memberId = (Long)httpServletRequest.getAttribute("memberId");
        return getResponseEntity(SuccessCode.OK, accountService.getAccountList(memberId));
    }

    @PostMapping
    @LoginOnly(level = LoginOnly.Level.ALL)
    public ResponseEntity<?> registrationAccount(HttpServletRequest httpServletRequest, @RequestBody RegistrationAccountRequest request){
        Long memberId = (Long)httpServletRequest.getAttribute("memberId");
        accountService.registrationAccount(memberId, request);
        return getResponseEntity(SuccessCode.OK);
    }

    @GetMapping("/withdraw")
    @LoginOnly(level = LoginOnly.Level.ALL)
    public ResponseEntity<?> getWithdrawList(HttpServletRequest httpServletRequest){
        Long memberId = (Long)httpServletRequest.getAttribute("memberId");
        return getResponseEntity(SuccessCode.OK, accountService.getAccountWithdraw(memberId));
    }
}
