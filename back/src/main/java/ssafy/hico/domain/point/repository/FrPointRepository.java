package ssafy.hico.domain.point.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ssafy.hico.domain.country.entity.Country;
import ssafy.hico.domain.point.entity.FrPoint;
import ssafy.hico.domain.wallet.entity.FrWallet;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface FrPointRepository extends JpaRepository<FrPoint, Long> {

    @Modifying
    @Query("UPDATE FrPoint SET balance = :balance WHERE frPointId = :frPointId")
    void updatePoint(@Param("frPointId") long frPointId, @Param("balance") BigDecimal balance);

    Optional<FrPoint> findByFrWalletAndCountry(FrWallet frWallet, Country country);

}
