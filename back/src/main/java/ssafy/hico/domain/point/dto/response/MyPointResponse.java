package ssafy.hico.domain.point.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class MyPointResponse {
    private Long countryId;
    private String code;
    private String frType;

    private BigDecimal point;
    private double basicRate;
}
