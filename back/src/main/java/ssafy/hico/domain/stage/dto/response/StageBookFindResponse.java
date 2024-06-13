package ssafy.hico.domain.stage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.stage.entity.Stage;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StageBookFindResponse {

    private long stageId;
    private String stageTitle;
    private double increase;
    private List<Page> pageList;

    public StageBookFindResponse(Stage stage, List<Page> pageList) {
        this.stageId = stage.getStageId();
        this.stageTitle = stage.getStageTitle();
        this.increase = stage.getIncrease();
        this.pageList = pageList;
    }

}
