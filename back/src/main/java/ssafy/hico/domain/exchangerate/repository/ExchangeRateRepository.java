package ssafy.hico.domain.exchangerate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.hico.domain.exchangerate.entity.ExchangeRate;
import ssafy.hico.domain.country.entity.Country;

import java.time.LocalDate;

import java.util.List;
import java.util.Optional;

public interface ExchangeRateRepository extends JpaRepository<ExchangeRate, Integer> {

    Optional<ExchangeRate> findByCountryAndTodayDate(Country country, LocalDate todayDate);
    Optional<List<ExchangeRate>> findAllByTodayDateOrderByCountry(LocalDate todayDate);
    Optional<List<ExchangeRate>> findAllByCountryAndTodayDateBetween(Country country, LocalDate startDate, LocalDate lastDate);

}
