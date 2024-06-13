package ssafy.hico.domain.wallet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.hico.domain.wallet.entity.FrWallet;

import java.util.Optional;

public interface FrWalletRepository extends JpaRepository<FrWallet, Long> {


    @Query("SELECT fr FROM FrWallet fr WHERE fr.member.id = :memberId")
    Optional<FrWallet> findByMemberId(@Param("memberId") Long memberId);
}
