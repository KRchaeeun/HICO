package ssafy.hico.domain.stage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.country.entity.Country;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProgressRate {

    private long countryId;
    private String countryName;
    private int progressRate;

    public ProgressRate(Country country, int progressRate) {
        this.countryId = country.getId();
        this.countryName = country.getCountryName();;
        this.progressRate = progressRate;
    }

}
