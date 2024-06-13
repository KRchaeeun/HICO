package ssafy.hico.domain.point.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.history.entity.History;
import ssafy.hico.domain.wallet.entity.FrWallet;
import ssafy.hico.global.entity.BaseTimeEntity;
import ssafy.hico.domain.country.entity.Country;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Entity
@NoArgsConstructor
public class FrPoint extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long frPointId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "fr_wallet_id")
    private FrWallet frWallet;

    private BigDecimal balance;

    @OneToMany(mappedBy = "frPoint")
    private List<History> histories = new ArrayList<>();

    @Builder
    public FrPoint(Country country, FrWallet frWallet, BigDecimal balance){
        this.country = country;
        this.frWallet = frWallet;
        this.balance = balance;
    }

}
