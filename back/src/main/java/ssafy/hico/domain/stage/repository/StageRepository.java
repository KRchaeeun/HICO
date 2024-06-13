package ssafy.hico.domain.stage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.hico.domain.country.entity.Country;
import ssafy.hico.domain.stage.entity.Stage;

import java.util.List;
import java.util.Optional;

public interface StageRepository extends JpaRepository<Stage, Long> {

    Optional<List<Stage>> findAllByCountry(Country country);

}
