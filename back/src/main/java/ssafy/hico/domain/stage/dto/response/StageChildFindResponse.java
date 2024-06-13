package ssafy.hico.domain.stage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.member.entity.Member;
import ssafy.hico.domain.stage.entity.StageStatus;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StageChildFindResponse {

    private boolean isTutorial;
    private int fuel;
    private List<ProgressRate> progressRateList;

    public StageChildFindResponse(Member child, List<ProgressRate> progressRateList) {
        this.isTutorial = child.getIsTutorial();
        this.fuel = child.getFuel();
        this.progressRateList = progressRateList;
    }

}
