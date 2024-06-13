package ssafy.hico.domain.member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import ssafy.hico.domain.quiz.entity.QuizStatus;
import ssafy.hico.domain.stage.entity.StageStatus;
import ssafy.hico.domain.wallet.entity.FrWallet;
import ssafy.hico.global.entity.BaseTimeEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Builder
@Table(name = "member")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Member parent;

    @Column(name = "email")
    private String email;

    @Column(name = "user_key")
    private String userKey;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "season_num")
    //@ColumnDefault("1")
    private Integer seasonNum;

    @Column(name = "fuel")
    @ColumnDefault("0")
    private Integer fuel;

    @Column(name = "is_tutorial")
    @ColumnDefault("false")
    private Boolean isTutorial;

    @OneToOne(mappedBy = "member")
    private FrWallet frWallet;

    @OneToMany(mappedBy = "member")
    private List<StageStatus> stageStatuses = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<QuizStatus> quizStatuses = new ArrayList<>();

    @Column(name = "invitation code")
    private String invitationCode;

    public void modifyTutorial() {
        this.isTutorial = true;
    }

    public void modifyFuel() { this.fuel += 5; }

}