package ssafy.hico.domain.quiz.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.global.entity.BaseTimeEntity;
import ssafy.hico.domain.country.entity.Country;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Entity
@NoArgsConstructor
public class QuizLevel extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Enumerated(EnumType.STRING)
    private Difficulty quizLevel;
    private double quizPrice;

    @OneToMany(mappedBy = "quizLevel")
    private List<Quiz> quizzes = new ArrayList<>();

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

}
