package ssafy.hico.domain.point.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.hico.domain.country.entity.Country;
import ssafy.hico.domain.country.repository.CountryRepository;
import ssafy.hico.domain.exchangerate.entity.ExchangeRate;
import ssafy.hico.domain.exchangerate.repository.ExchangeRateRepository;
import ssafy.hico.domain.history.dto.response.HistoryFindResponse;
import ssafy.hico.domain.history.dto.response.HistoryRec;
import ssafy.hico.domain.history.entity.History;
import ssafy.hico.domain.history.repository.HistoryRepository;
import ssafy.hico.domain.member.entity.Member;
import ssafy.hico.domain.member.repository.MemberRepository;
import ssafy.hico.domain.point.dto.ChildApplyTranRequest;
import ssafy.hico.domain.point.dto.response.MyPointResponse;
import ssafy.hico.domain.point.entity.FrPoint;
import ssafy.hico.domain.point.repository.FrPointRepository;
import ssafy.hico.domain.transaction.entity.FrTransaction;
import ssafy.hico.domain.transaction.repository.FrTransactionRepository;
import ssafy.hico.domain.wallet.entity.FrWallet;
import ssafy.hico.domain.wallet.repository.FrWalletRepository;
import ssafy.hico.global.response.error.ErrorCode;
import ssafy.hico.global.response.error.exception.CustomException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PointService {

    private final FrTransactionRepository frTransactionRepository;
    private final ExchangeRateRepository exchangeRateRepository;
    private final FrWalletRepository frWalletRepository;
    private final FrPointRepository frPointRepository;
    private final HistoryRepository historyRepository;
    private final CountryRepository countryRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void addFrTransaction(Long memberId, ChildApplyTranRequest request) {
        FrWallet frWallet = frWalletRepository.findByMemberId(memberId).get();
        for(FrPoint point : frWallet.getFrPoints()){
            if(point.getCountry().getId() == request.getCountryId()){
                BigDecimal balance = point.getBalance().subtract(request.getFrBalance());
                BigDecimal roundedBalance = balance.setScale(2, RoundingMode.HALF_UP);

                if (roundedBalance.compareTo(BigDecimal.ZERO) < 0) {
                    throw new CustomException(ErrorCode.NOT_ENOUGH_BALANCE);
                }
                frPointRepository.updatePoint(point.getFrPointId(), roundedBalance);
                FrTransaction frTransaction = FrTransaction.builder()
                        .country(point.getCountry())
                        .frWallet(frWallet)
                        .balance(request.getBalance())
                        .frBalance(request.getFrBalance()).build();
                frTransactionRepository.save(frTransaction);
                break;
            }
        }


    }

    public List<MyPointResponse> findAllPointAndExchangeRate(Long memberId) {
        LocalDate now = LocalDate.now();
        FrWallet frWallet = frWalletRepository.findByMemberId(memberId).get();
        List<FrPoint> pointList = frWallet.getFrPoints();

        List<ExchangeRate> todayExchangeRate = findExchangeRateByTodayOrElseYesterday().get();
        Map<Long, ExchangeRate> exchangeRateMap = todayExchangeRate.stream()
                .collect(Collectors.toMap(rate -> rate.getCountry().getId(), rate -> rate));

        return pointList.stream().map(frPoint -> {
            ExchangeRate exchangeRate = exchangeRateMap.get(frPoint.getCountry().getId());

            return new MyPointResponse(
                    frPoint.getCountry().getId(),
                    frPoint.getCountry().getCode(),
                    frPoint.getCountry().getFrType(),
                    frPoint.getBalance(),
                    exchangeRate.getBasicRate()
            );
        }).collect(Collectors.toList());


    }

    public Optional<List<ExchangeRate>> findExchangeRateByTodayOrElseYesterday() {
        LocalDate today = LocalDate.now();
        Optional<List<ExchangeRate>> todayExchangeRate = exchangeRateRepository.findAllByTodayDateOrderByCountry(today);

        if (todayExchangeRate.isPresent() && !todayExchangeRate.get().isEmpty()) {
            return todayExchangeRate;
        } else {
            LocalDate yesterday = today.minusDays(1);
            return exchangeRateRepository.findAllByTodayDateOrderByCountry(yesterday);
        }
    }

    public HistoryFindResponse findHistoryList(long memberId, long countryId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        Country country = countryRepository.findById(countryId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COUNTRY));
        FrPoint frPoint = frPointRepository.findByFrWalletAndCountry(member.getFrWallet(), country)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_POINT));
        List<History> histories = historyRepository.findAllByFrPointOrderByDateDesc(frPoint);
        List<HistoryRec> historyList = new ArrayList<>();
        for (History history : histories) {
            historyList.add(new HistoryRec(history));
        }
        return new HistoryFindResponse(frPoint, historyList);
    }

}
