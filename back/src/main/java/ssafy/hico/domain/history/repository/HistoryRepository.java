package ssafy.hico.domain.history.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.hico.domain.history.entity.History;
import ssafy.hico.domain.point.entity.FrPoint;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Double> {

    List<History> findAllByFrPointOrderByDateDesc(FrPoint frPoint);

}
