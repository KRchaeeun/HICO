package ssafy.hico.domain.point.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ChildApplyTranRequest {
    private BigDecimal balance;
    private BigDecimal frBalance;
    private Long countryId;
}
