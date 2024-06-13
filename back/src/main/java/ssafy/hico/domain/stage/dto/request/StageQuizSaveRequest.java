package ssafy.hico.domain.stage.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.member.entity.Member;
import ssafy.hico.domain.quiz.entity.QuizStatus;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StageQuizSaveRequest {

    private long stageId;
    private BigDecimal price;
    private int count;
    private List<QuizResult> quizResultList;

}
