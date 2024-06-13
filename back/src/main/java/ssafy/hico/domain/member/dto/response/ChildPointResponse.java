package ssafy.hico.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ChildPointResponse {
    private Long frPointId;
    private Long countryId;
    private String countryName;
    private String code;
    private String frType;
    private BigDecimal point;

}


