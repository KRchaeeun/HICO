package ssafy.hico.domain.stage.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.quiz.entity.Difficulty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizResult {

    private long quizId;
    private boolean isCorrect;

}
