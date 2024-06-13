package ssafy.hico.domain.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.hico.domain.quiz.entity.Quiz;
import ssafy.hico.domain.stage.entity.Stage;

import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    Optional<List<Quiz>> findAllByStage(Stage stage);

    List<Quiz> findByQuizLevel_Country_Id(Long countryId);
}
