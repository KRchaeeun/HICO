package ssafy.hico.domain.stage.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.member.entity.Member;
import ssafy.hico.global.entity.BaseTimeEntity;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Entity
@NoArgsConstructor
public class StageStatus extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stageStatusId;
    private boolean isPassed;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "stage_id")
    private Stage stage;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public static StageStatus createStageStatus(Stage stage, Member child, boolean isPassed) {
        StageStatus stageStatus = new StageStatus();
        stageStatus.stage = stage;
        stageStatus.member = child;
        stageStatus.isPassed = isPassed;
        return stageStatus;
    }

    public void modifyStageStatus() {
        this.isPassed = true;
    }

}
