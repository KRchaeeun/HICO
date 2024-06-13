package ssafy.hico.domain.exchangerate.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.hico.domain.exchangerate.dto.response.ExchangeRateFindResponse;
import ssafy.hico.domain.exchangerate.service.ExchangeRateService;
import ssafy.hico.global.annotation.LoginOnly;
import ssafy.hico.global.response.success.SuccessCode;

import java.util.List;

import static ssafy.hico.global.response.success.CommonResponseEntity.getResponseEntity;

@Slf4j
@RestController
@RequestMapping("/rate")
@RequiredArgsConstructor
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;

    @GetMapping("")
    public ResponseEntity<?> exchangeRateTodayList() {
        List<ExchangeRateFindResponse> exchangeRateList = exchangeRateService.findTodayExchangeRate();
        return getResponseEntity(SuccessCode.OK, exchangeRateList);
    }

    @GetMapping("/{countryId}")
    public ResponseEntity<?> exchangeRateMonthList(@PathVariable int countryId) {
        List<ExchangeRateFindResponse> exchangeRateList = exchangeRateService.findMonthExchangeRate(countryId);
        return getResponseEntity(SuccessCode.OK, exchangeRateList);
    }

    @GetMapping("/start")
    public ResponseEntity<?> exchangeRateMonthSave() {
        exchangeRateService.getMonthExchangeRate();
        return getResponseEntity(SuccessCode.OK);
    }

}
