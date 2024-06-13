package ssafy.hico.domain.stage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.hico.domain.member.entity.Member;
import ssafy.hico.domain.stage.entity.Stage;
import ssafy.hico.domain.stage.entity.StageStatus;

import java.util.List;
import java.util.Optional;

public interface StageStatusRepository extends JpaRepository<StageStatus, Long> {

    Optional<List<StageStatus>> findAllByMemberId(long childId);
    Optional<StageStatus> findByMemberAndStage(Member member, Stage stage);

    List<StageStatus> findAllByMemberIdAndStage_Country_Id(Long childId, long id);
}
