package ssafy.hico.domain.exchangerate.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import ssafy.hico.domain.exchangerate.dto.response.ExchangeRateApiResponse;
import ssafy.hico.domain.exchangerate.dto.response.ExchangeRateFindResponse;
import ssafy.hico.domain.exchangerate.entity.ExchangeRate;
import ssafy.hico.domain.exchangerate.entity.Variation;
import ssafy.hico.domain.exchangerate.repository.ExchangeRateRepository;
import ssafy.hico.domain.country.entity.Country;
import ssafy.hico.domain.country.repository.CountryRepository;
import ssafy.hico.global.response.error.ErrorCode;
import ssafy.hico.global.response.error.exception.CustomException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Component
@RequiredArgsConstructor
public class ExchangeRateService {

    private final ExchangeRateRepository exchangeRateRepository;
    private final CountryRepository countryRepository;

    private String URL = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=";
    @Value("${currency.secret-key}")
    private String APIKEY;
    private String SEARCHDATE = "&searchdate=";
    private String DATA = "&data=AP01";

    public WebClient getBaseUrl(final String url) {
        return WebClient.builder()
                .baseUrl(url)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, String.valueOf(MediaType.APPLICATION_JSON))
                .build()
                .mutate()
                .build();
    }

    public ExchangeRateApiResponse[] getExchangeRateApiResponse(LocalDate date) {
        WebClient webClient = getBaseUrl(URL + APIKEY + SEARCHDATE + date + DATA);
        Mono<ExchangeRateApiResponse[]> response = webClient.get()
                .retrieve()
                .bodyToMono(ExchangeRateApiResponse[].class).log();
        return response.block();
    }

    @Scheduled(cron = "0 10 11 * * *")
    public void getTodayExchangeRate() {
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);
        ExchangeRateApiResponse[] exchangeRateDtos = getExchangeRateApiResponse(today);
        for (ExchangeRateApiResponse dto : exchangeRateDtos) {
            Country country = countryRepository.findByCode(dto.getCurUnit().substring(0, 3))
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COUNTRY));
            ExchangeRate todayExchangeRate = null;
            try {
                ExchangeRate yesterdayExchangeRate = exchangeRateRepository.findByCountryAndTodayDate(country, yesterday)
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_EXCHANGE_RATE));
                double amount = yesterdayExchangeRate.getBasicRate() - Double.valueOf(dto.getDealBasR().replace(",", ""));
                if (amount > 0) todayExchangeRate = dto.createExchangeRate(country, Variation.INCREASE, amount);
                else if (amount < 0) todayExchangeRate = dto.createExchangeRate(country, Variation.DECREASE, -amount);
                else todayExchangeRate = dto.createExchangeRate(country, Variation.EQUAL, amount);
            } catch (NullPointerException e) {
                todayExchangeRate = dto.createExchangeRate(country, null, 0);
            } finally {
                exchangeRateRepository.save(todayExchangeRate);
            }
        }
        if (exchangeRateDtos.length == 0) {
            List<ExchangeRate> ers = exchangeRateRepository.findAllByTodayDateOrderByCountry(yesterday)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COUNTRY));;
            for (ExchangeRate er : ers) {
                exchangeRateRepository.save(ExchangeRate.createExchangeRate(er, today));
            }
        }
    }

    public List<ExchangeRateFindResponse> findTodayExchangeRate() {
        LocalDate today = LocalDate.now();
        if (LocalTime.now().isBefore(LocalTime.of(11, 10))) today = today.minusDays(1);
        List<ExchangeRate> exchangeRates = exchangeRateRepository.findAllByTodayDateOrderByCountry(today)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_EXCHANGE_RATE));
        List<ExchangeRateFindResponse> exchangeRateList = new ArrayList<>();
        for (ExchangeRate exchangeRate : exchangeRates) {
            exchangeRateList.add(new ExchangeRateFindResponse(exchangeRate));
        }
        return exchangeRateList;
    }

    public List<ExchangeRateFindResponse> findMonthExchangeRate(long countryId) {
        LocalDate today = LocalDate.now();
        if (LocalTime.now().isBefore(LocalTime.of(11, 10))) today = today.minusDays(1);
        Country country = countryRepository.findById(countryId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COUNTRY));
        List<ExchangeRate> exchangeRates = exchangeRateRepository.findAllByCountryAndTodayDateBetween(country, today.minusDays(30), today)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_EXCHANGE_RATE));
        List<ExchangeRateFindResponse> exchangeRateList = new ArrayList<>();
        for (ExchangeRate exchangeRate : exchangeRates) {
            exchangeRateList.add(new ExchangeRateFindResponse(exchangeRate));
        }
        return exchangeRateList;
    }

    public void getMonthExchangeRate() {
        LocalDate today = LocalDate.now();
        LocalDate date = today.minusDays(30);
        LocalDate tomorrow = today.plusDays(1);
        ExchangeRateApiResponse[] exchangeRateDtos = null;
        while (true) {
            exchangeRateDtos = getExchangeRateApiResponse(date);
            for (ExchangeRateApiResponse dto : exchangeRateDtos) {
                Country country = countryRepository.findByCode(dto.getCurUnit().substring(0, 3))
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COUNTRY));
                ExchangeRate todayExchangeRate = dto.createExchangeRate(country, null, 0, date);
                exchangeRateRepository.save(todayExchangeRate);
            }
            if (exchangeRateDtos.length ==0) date = date.minusDays(1);
            else break;
        }
        date = date.plusDays(1);
        while (date.compareTo(tomorrow) != 0) {
            LocalDate yesterday = date.minusDays(1);
            exchangeRateDtos = getExchangeRateApiResponse(date);
            for (ExchangeRateApiResponse dto : exchangeRateDtos) {
                Country country = countryRepository.findByCode(dto.getCurUnit().substring(0, 3))
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COUNTRY));
                ExchangeRate todayExchangeRate = null;
                try {
                    ExchangeRate yesterdayExchangeRate = exchangeRateRepository.findByCountryAndTodayDate(country, yesterday)
                            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_EXCHANGE_RATE));
                    double amount = yesterdayExchangeRate.getBasicRate() - Double.valueOf(dto.getDealBasR().replace(",", ""));
                    if (amount > 0) todayExchangeRate = dto.createExchangeRate(country, Variation.INCREASE, amount, date);
                    else if (amount < 0) todayExchangeRate = dto.createExchangeRate(country, Variation.DECREASE, -amount, date);
                    else todayExchangeRate = dto.createExchangeRate(country, Variation.EQUAL, amount, date);
                } catch (NullPointerException e) {
                    todayExchangeRate = dto.createExchangeRate(country, null, 0, date);
                } finally {
                    exchangeRateRepository.save(todayExchangeRate);
                }
            }
            if (exchangeRateDtos.length == 0) {
                List<ExchangeRate> ers = exchangeRateRepository.findAllByTodayDateOrderByCountry(yesterday)
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COUNTRY));;
                for (ExchangeRate er : ers) {
                    exchangeRateRepository.save(ExchangeRate.createExchangeRate(er, date));
                }
            }
            date = date.plusDays(1);
        }
    }

}
