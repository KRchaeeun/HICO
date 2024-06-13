package ssafy.hico.domain.quiz.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.stage.entity.Stage;
import ssafy.hico.global.entity.BaseTimeEntity;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Entity
@NoArgsConstructor
public class Quiz extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String quizQuestion;
    private String quizAnswer;
    @Enumerated(EnumType.STRING)
    private QuizType quizType;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "stage_id")
    private Stage stage;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "quiz_level_id")
    private QuizLevel quizLevel;

    @OneToMany(mappedBy = "quiz")
    private List<QuizStatus> quizStatuses = new ArrayList<>();

}
