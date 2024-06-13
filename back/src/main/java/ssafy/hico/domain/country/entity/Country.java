package ssafy.hico.domain.country.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.exchangerate.entity.ExchangeRate;
import ssafy.hico.domain.point.entity.FrPoint;
import ssafy.hico.domain.quiz.entity.QuizLevel;
import ssafy.hico.domain.stage.entity.Stage;
import ssafy.hico.domain.transaction.entity.FrTransaction;
import ssafy.hico.global.entity.BaseTimeEntity;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Country extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String countryName;
    private String code;
    private String frType;

    @OneToMany(mappedBy = "country")
    private List<ExchangeRate> exchangeRates = new ArrayList<>();

    @OneToMany(mappedBy = "country")
    private List<FrPoint> frPoints = new ArrayList<>();

    @OneToMany(mappedBy = "country")
    private List<Stage> stages = new ArrayList<>();

    @OneToMany(mappedBy = "country")
    private List<QuizLevel> quizLevels = new ArrayList<>();

    @OneToMany(mappedBy = "country")
    private List<FrTransaction> frTransactions = new ArrayList<>();

}
