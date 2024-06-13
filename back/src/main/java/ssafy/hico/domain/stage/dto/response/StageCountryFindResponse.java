package ssafy.hico.domain.stage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.stage.entity.Stage;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StageCountryFindResponse {

    private long stageId;
    private int stageNum;
    private String stageTitle;
    private double increase;
    private boolean isPassed;
    private int answer;

    public StageCountryFindResponse(Stage stage, boolean isPassed, int answer) {
        this.stageId = stage.getStageId();
        this.stageNum = stage.getStageNum();
        this.stageTitle = stage.getStageTitle();
        this.increase = stage.getIncrease();
        this.isPassed = isPassed;
        this.answer = answer;
    }

}
