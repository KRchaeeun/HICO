package ssafy.hico.domain.stage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StageQuizFindResponse {

    private double increase;
    private List<QuizInfo> quizList;

}
