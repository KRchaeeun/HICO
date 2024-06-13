package ssafy.hico.domain.stage.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.hico.domain.stage.dto.request.StageQuizSaveRequest;
import ssafy.hico.domain.stage.dto.response.StageBookFindResponse;
import ssafy.hico.domain.stage.dto.response.StageChildFindResponse;
import ssafy.hico.domain.stage.dto.response.StageCountryFindResponse;
import ssafy.hico.domain.stage.dto.response.StageQuizFindResponse;
import ssafy.hico.domain.stage.service.StageService;
import ssafy.hico.global.annotation.LoginOnly;
import ssafy.hico.global.response.success.SuccessCode;

import java.util.List;

import static ssafy.hico.global.response.success.CommonResponseEntity.getResponseEntity;

@Slf4j
@RestController
@RequestMapping("/stage")
@RequiredArgsConstructor
public class StageController {

    private final StageService stageService;

    @GetMapping("/child")
    @LoginOnly(level = LoginOnly.Level.CHILD)
    public ResponseEntity<?> stageChildDetails(HttpServletRequest httpServletRequest) {
        Long memberId = (Long) httpServletRequest.getAttribute("memberId");
        StageChildFindResponse stageChildFindResponse = stageService.findChildStage(memberId);
        return getResponseEntity(SuccessCode.OK, stageChildFindResponse);
    }

    @PatchMapping("/tutorial")
    @LoginOnly(level = LoginOnly.Level.CHILD)
    public ResponseEntity<?> stageTutorialModify(HttpServletRequest httpServletRequest) {
        Long memberId = (Long) httpServletRequest.getAttribute("memberId");
        stageService.modifyTutorial(memberId);
        return getResponseEntity(SuccessCode.OK);
    }

    @GetMapping("/country/{countryId}")
    @LoginOnly(level = LoginOnly.Level.CHILD)
    public ResponseEntity<?> stageCountryList(@PathVariable("countryId") int countryId, HttpServletRequest httpServletRequest) {
        Long memberId = (Long) httpServletRequest.getAttribute("memberId");
        List<StageCountryFindResponse> stageList = stageService.findCountryStage(memberId, countryId);
        return getResponseEntity(SuccessCode.OK, stageList);
    }

    @GetMapping("/book/{stageId}")
    @LoginOnly(level = LoginOnly.Level.CHILD)
    public ResponseEntity<?> stageBookList(@PathVariable("stageId") long stageId) {
        StageBookFindResponse stageBookFindResponse = stageService.findBookStage(stageId);
        return getResponseEntity(SuccessCode.OK, stageBookFindResponse);
    }

    @GetMapping("/quiz/{stageId}")
    @LoginOnly(level = LoginOnly.Level.CHILD)
    public ResponseEntity<?> stageQuizList(@PathVariable("stageId") int stageId, HttpServletRequest httpServletRequest) {
        Long memberId = (Long) httpServletRequest.getAttribute("memberId");
        StageQuizFindResponse stageQuizFindResponse = stageService.findQuizStage(stageId, memberId);
        return getResponseEntity(SuccessCode.OK, stageQuizFindResponse);
    }

    @PostMapping("/quiz")
    @LoginOnly(level = LoginOnly.Level.CHILD)
    public ResponseEntity<?> stageQuizSave(@RequestBody StageQuizSaveRequest stageQuizSaveRequest, HttpServletRequest httpServletRequest) {
        System.out.println(stageQuizSaveRequest.toString());
        Long memberId = (Long) httpServletRequest.getAttribute("memberId");
        stageService.saveStageQuiz(stageQuizSaveRequest, memberId);
        return getResponseEntity(SuccessCode.OK);
    }

}
