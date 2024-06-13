package ssafy.hico.domain.quiz.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.member.entity.Member;
import ssafy.hico.domain.stage.dto.request.QuizResult;
import ssafy.hico.global.entity.BaseTimeEntity;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Entity
@NoArgsConstructor
public class QuizStatus extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    private Boolean isCorrect;

    public static QuizStatus createQuizStatus(Member child, Quiz quiz, boolean isCorrect) {
        QuizStatus quizStatus = new QuizStatus();
        quizStatus.member = child;
        quizStatus.quiz = quiz;
        quizStatus.isCorrect = isCorrect;
        return quizStatus;
    }

    public void modifyQuizStatus() {
        this.isCorrect = true;
    }

}
