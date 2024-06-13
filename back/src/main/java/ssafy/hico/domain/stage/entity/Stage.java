package ssafy.hico.domain.stage.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.book.entity.BookPage;
import ssafy.hico.domain.history.entity.History;
import ssafy.hico.domain.quiz.entity.Quiz;
import ssafy.hico.global.entity.BaseTimeEntity;
import ssafy.hico.domain.country.entity.Country;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Entity
@NoArgsConstructor
public class Stage extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stageId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "season_id")
    private Season season;

    private int stageNum;
    private String stageTitle;
    private double increase;

    @OneToMany(mappedBy = "stage")
    private List<BookPage> bookPages = new ArrayList<>();

    @OneToMany(mappedBy = "stage")
    private List<StageStatus> stageStatuses = new ArrayList<>();

    @OneToMany(mappedBy = "stage")
    private List<Quiz> quizzes = new ArrayList<>();

    @OneToMany(mappedBy = "stage")
    private List<History> histories = new ArrayList<>();

}


