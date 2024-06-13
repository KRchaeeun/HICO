package ssafy.hico.domain.stage.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.global.entity.BaseTimeEntity;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Season extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long seasonId;
    private int seasonNum;
    private String seasonExplanation;

    @OneToMany(mappedBy = "season")
    private List<Stage> stages = new ArrayList<>();

}
