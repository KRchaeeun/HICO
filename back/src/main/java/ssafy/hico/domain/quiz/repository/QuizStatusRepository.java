package ssafy.hico.domain.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.hico.domain.quiz.entity.QuizStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizStatusRepository extends JpaRepository<QuizStatus, Long> {

    List<QuizStatus> findByMember_IdAndQuiz_IdInAndIsCorrectTrue(Long childId, List<Long> quizIds);
    Optional<QuizStatus> findByMemberIdAndQuizId(Long childId, Long quizId);

}
