package ssafy.hico.domain.history.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.country.entity.Country;
import ssafy.hico.domain.history.entity.History;
import ssafy.hico.domain.point.entity.FrPoint;
import ssafy.hico.domain.stage.entity.Stage;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoryRec {

    private long historyId;
    private String stageId;
    private BigDecimal price;
    private LocalDate date;

    public HistoryRec(History history) {
        this.historyId = history.getHistoryId();
        this.stageId = history.getStage().getStageTitle();
        this.price = history.getPrice();
        this.date = history.getDate();
    }

}
