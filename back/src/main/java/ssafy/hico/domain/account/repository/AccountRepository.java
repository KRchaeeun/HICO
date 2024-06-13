package ssafy.hico.domain.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ssafy.hico.domain.account.entity.Account;
import ssafy.hico.domain.member.entity.Member;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByMember(Member member);

    @Query("SELECT a FROM Account a WHERE a.member.id = :memberId")
    Optional<Account> findByMemberId(@Param("memberId") Long memberId);
}
