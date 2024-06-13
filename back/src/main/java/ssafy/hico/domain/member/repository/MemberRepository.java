package ssafy.hico.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ssafy.hico.domain.member.entity.Member;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByInvitationCode(String code);

    @Modifying
    @Query("UPDATE Member SET refreshToken= :refreshToken where id=:memberId")
    void updateRefreshToken(@Param("memberId") Long memberId, @Param("refreshToken") String refreshToken);

    @Query("SELECT m.id FROM Member m WHERE m.parent.id = :parentId")
    List<Long> findIdsByParentId(@Param("parentId") Long parentId);

    List<Member> findByParentId(Long memberId);
}
