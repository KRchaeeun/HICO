package ssafy.hico.global.bank;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import ssafy.hico.global.bank.dto.request.Header;
import ssafy.hico.global.response.error.exception.BankException;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;

@Component
@RequiredArgsConstructor
public class BankApiClient {

    private final BankProperties properties;

    public String getResponse(String url, Object requestBody) {
        String response = null;
        WebClient webClient = WebClient.create(url);
        try {
            response = webClient.post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class).block();
        }catch (WebClientResponseException exception) {
            String responseBody = exception.getResponseBodyAsString();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                BankErrorResponse errorResponse = objectMapper.readValue(responseBody, BankErrorResponse.class);
                throw new BankException(errorResponse.getResponseCode(), errorResponse.getResponseMessage());
            } catch (IOException e) {
                e.printStackTrace(); // JSON 파싱 실패 처리
            }
        }
        return response;
    }

    public Header makeHeader(String apiName, String userKey){
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss");
        String today = LocalDate.now().format(dateFormatter);
        String now = LocalTime.now().format(timeFormatter);

        int randomNumber = ThreadLocalRandom.current().nextInt(100000, 1000000);
        String uniqueNumber = today + now + String.format("%06d", randomNumber);

        Header.HeaderBuilder builder = Header.builder()
                .apiName(apiName)
                .transmissionDate(today)
                .transmissionTime(now)
                .institutionCode(properties.getInstitutionCode())
                .fintechAppNo(properties.getFintechAppNo())
                .apiServiceCode(apiName)
                .institutionTransactionUniqueNo(uniqueNumber)
                .apiKey(properties.getApiKey())
                .userKey(userKey);

        if(userKey != null){
            builder.userKey(userKey);
        }

        return builder.build();
    }

    public <T> T getDtoFromResponse(String response, Class<T> objectClass) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(response, objectClass);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
