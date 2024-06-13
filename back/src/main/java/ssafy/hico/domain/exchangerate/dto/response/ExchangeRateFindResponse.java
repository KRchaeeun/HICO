package ssafy.hico.domain.exchangerate.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.exchangerate.entity.ExchangeRate;
import ssafy.hico.domain.exchangerate.entity.Variation;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExchangeRateFindResponse {

    private long exchangeRateId;
    private String frType;
    private String code;
    private double basicRate;
    private Variation riseStatus;
    private double amount;
    private LocalDate todayDate;

    public ExchangeRateFindResponse(ExchangeRate exchangeRate) {
        this.exchangeRateId = exchangeRate.getExchangeRateId();
        this.frType = exchangeRate.getCountry().getFrType();
        this.code = exchangeRate.getCountry().getCode();
        this.basicRate = (double) Math.round(exchangeRate.getBasicRate() * 100) / 100;
        this.riseStatus = exchangeRate.getRiseStatus();
        this.amount = (double) Math.round(exchangeRate.getAmount() * 100) / 100;
        this.todayDate = exchangeRate.getTodayDate();
    }

}
