package ssafy.hico.domain.stage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.quiz.entity.Difficulty;
import ssafy.hico.domain.quiz.entity.Quiz;
import ssafy.hico.domain.quiz.entity.QuizType;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizInfo {

    private long quizId;
    private String quizQuestion;
    private String quizAnswer;
    private QuizType quizType;
    private Difficulty quizLevel;
    private double quizPrice;
    private boolean isCorrect;

    public QuizInfo(Quiz quiz, boolean isCorrect) {
        this.quizId = quiz.getId();
        this.quizQuestion = quiz.getQuizQuestion();
        this.quizAnswer = quiz.getQuizAnswer();
        this.quizType = quiz.getQuizType();
        this.quizLevel = quiz.getQuizLevel().getQuizLevel();
        this.quizPrice = quiz.getQuizLevel().getQuizPrice();
        this.isCorrect = isCorrect;
    }

}
