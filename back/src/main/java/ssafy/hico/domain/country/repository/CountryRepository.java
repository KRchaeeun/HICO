package ssafy.hico.domain.country.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.hico.domain.country.entity.Country;

import java.util.List;
import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {

    Optional<Country> findByCode(String curUnit);

    List<Country> findByIdBetween(long start, long end);
}
