package ssafy.hico.domain.history.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.country.entity.Country;
import ssafy.hico.domain.point.entity.FrPoint;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoryFindResponse {

    private long frPointId;
    private long countryId;
    private List<HistoryRec> historyList;

    public HistoryFindResponse(FrPoint frPoint, List<HistoryRec> historyList) {
        this.frPointId = frPoint.getFrPointId();
        this.countryId = frPoint.getCountry().getId();
        this.historyList = historyList;
    }

}
