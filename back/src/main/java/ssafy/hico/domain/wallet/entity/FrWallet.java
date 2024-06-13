package ssafy.hico.domain.wallet.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.member.entity.Member;
import ssafy.hico.domain.point.entity.FrPoint;
import ssafy.hico.domain.transaction.entity.FrTransaction;
import ssafy.hico.domain.wallet.repository.FrWalletRepository;
import ssafy.hico.global.entity.BaseTimeEntity;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Entity
@NoArgsConstructor
public class FrWallet extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long frWalletId;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "frWallet")
    private List<FrPoint> frPoints = new ArrayList<>();

    @OneToMany(mappedBy = "frWallet")
    private List<FrTransaction> frTransactions = new ArrayList<>();

    @Builder
    public FrWallet(Member member){
        this.member = member;
    }

}
