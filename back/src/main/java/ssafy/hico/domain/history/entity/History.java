package ssafy.hico.domain.history.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.country.entity.Country;
import ssafy.hico.domain.point.entity.FrPoint;
import ssafy.hico.domain.stage.entity.Stage;
import ssafy.hico.global.entity.BaseTimeEntity;

import java.math.BigDecimal;
import java.time.LocalDate;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Entity
@NoArgsConstructor
public class History extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long historyId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "fr_point_id")
    private FrPoint frPoint;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "stage_id")
    private Stage stage;

    private BigDecimal price;
    private LocalDate date;

    public static History createHistory(FrPoint frPoint, Stage stage, BigDecimal price) {
        History history = new History();
        history.frPoint = frPoint;
        history.stage = stage;
        history.price = price;
        history.date = LocalDate.now();
        return history;
    }

}
