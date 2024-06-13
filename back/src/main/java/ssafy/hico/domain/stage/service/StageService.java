package ssafy.hico.domain.stage.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ssafy.hico.domain.book.entity.BookPage;
import ssafy.hico.domain.country.entity.Country;
import ssafy.hico.domain.country.repository.CountryRepository;
import ssafy.hico.domain.history.entity.History;
import ssafy.hico.domain.history.repository.HistoryRepository;
import ssafy.hico.domain.member.entity.Member;
import ssafy.hico.domain.member.repository.MemberRepository;
import ssafy.hico.domain.point.entity.FrPoint;
import ssafy.hico.domain.point.repository.FrPointRepository;
import ssafy.hico.domain.quiz.entity.Quiz;
import ssafy.hico.domain.quiz.entity.QuizStatus;
import ssafy.hico.domain.quiz.repository.QuizRepository;
import ssafy.hico.domain.quiz.repository.QuizStatusRepository;
import ssafy.hico.domain.stage.dto.request.QuizResult;
import ssafy.hico.domain.stage.dto.request.StageQuizSaveRequest;
import ssafy.hico.domain.stage.dto.response.*;
import ssafy.hico.domain.stage.entity.Stage;
import ssafy.hico.domain.stage.entity.StageStatus;
import ssafy.hico.domain.stage.repository.StageRepository;
import ssafy.hico.domain.stage.repository.StageStatusRepository;
import ssafy.hico.domain.wallet.entity.FrWallet;
import ssafy.hico.global.jwt.JwtTokenProvider;
import ssafy.hico.global.response.error.ErrorCode;
import ssafy.hico.global.response.error.exception.CustomException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Component
@RequiredArgsConstructor
public class StageService {

    private final StageRepository stageRepository;
    private final MemberRepository memberRepository;
    private final StageStatusRepository stageStatusRepository;
    private final CountryRepository countryRepository;
    private final QuizRepository quizRepository;
    private final QuizStatusRepository quizStatusRepository;
    private final FrPointRepository frPointRepository;
    private final HistoryRepository historyRepository;

    private final static int COUNTRY_NUM = 4;

    public StageChildFindResponse findChildStage(long childId) {
        Member child = memberRepository.findById(childId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        List<StageStatus> stageStatuses = stageStatusRepository.findAllByMemberId(childId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        List<ProgressRate> progressRateList = new ArrayList<>();
        int[] progressRates = new int[COUNTRY_NUM];
        for (StageStatus stageStatus : stageStatuses) {
            Country country = stageStatus.getStage().getCountry();
            Long countryId = country.getId();
            int countryIndex = countryId.intValue() - 1;
            if (stageStatus.isPassed()) {
                progressRates[countryIndex] += 20;
            }
        }
        for (Long i = 0L; i < COUNTRY_NUM; i++) {
            Country country = countryRepository.findById(i + 1)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COUNTRY));
            progressRateList.add(new ProgressRate(country.getId(), country.getCountryName(), progressRates[i.intValue()]));
        }
        return new StageChildFindResponse(child, progressRateList);
    }

    @Transactional
    public void modifyTutorial(long childId) {
        Member child = memberRepository.findById(childId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        child.modifyTutorial();
    }

    public List<StageCountryFindResponse> findCountryStage(long memberId, long countryId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER));
        Country country = countryRepository.findById(countryId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COUNTRY));
        List<Stage> stages = stageRepository.findAllByCountry(country)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STAGE));
        List<StageCountryFindResponse> stageList = new ArrayList<>();
        for (Stage stage : stages) {
            List<Quiz> quizzes = quizRepository.findAllByStage(stage)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_QUIZ));
            int answer = 0;
            for (Quiz quiz : quizzes) {
                Optional<QuizStatus> quizStatus = quizStatusRepository.findByMemberIdAndQuizId(memberId, quiz.getId());
                if (!quizStatus.isEmpty() && quizStatus.get().getIsCorrect()) answer++;
            }
            Optional<StageStatus> stageStatus = stageStatusRepository.findByMemberAndStage(member, stage);
            if (!stageStatus.isEmpty()) stageList.add(new StageCountryFindResponse(stage, stageStatus.get().isPassed(), answer));
            else stageList.add(new StageCountryFindResponse(stage, false, answer));
        }
        return stageList;
    }

    public StageBookFindResponse findBookStage(long stageId) {
        Stage stage = stageRepository.findById(stageId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STAGE));
        List<BookPage> bookPages = stage.getBookPages();
        List<Page> pages = new ArrayList<>();
        for (BookPage bookPage : bookPages) {
            pages.add(new Page(bookPage));
        }
        return new StageBookFindResponse(stage, pages);
    }

    public StageQuizFindResponse findQuizStage(long stageId, long memberId) {
        Stage stage = stageRepository.findById(stageId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STAGE));
        List<Quiz> quizzes = quizRepository.findAllByStage(stage)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_QUIZ));
        List<QuizInfo> quizInfos = new ArrayList<>();
        for (Quiz quiz : quizzes) {
            Optional<QuizStatus> quizStatus = quizStatusRepository.findByMemberIdAndQuizId(memberId, quiz.getId());
            if (quizStatus.isEmpty() || !quizStatus.get().getIsCorrect()) quizInfos.add(new QuizInfo(quiz, false));
            else quizInfos.add(new QuizInfo(quiz, true));
        }
        return new StageQuizFindResponse(stage.getIncrease(), quizInfos);
    }

    @Transactional
    public void saveStageQuiz(StageQuizSaveRequest stageQuizSaveRequest, long memberId) {
        if (stageQuizSaveRequest.getCount() < 7) return;
        Member child = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        Stage stage = stageRepository.findById(stageQuizSaveRequest.getStageId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STAGE));
        FrPoint frPoint = frPointRepository.findByFrWalletAndCountry(child.getFrWallet(), stage.getCountry())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_POINT));
        BigDecimal balance = frPoint.getBalance().add(stageQuizSaveRequest.getPrice());
        if (!stageQuizSaveRequest.getPrice().equals(BigDecimal.valueOf(0))) {
            historyRepository.save(History.createHistory(frPoint, stage, stageQuizSaveRequest.getPrice()));
            frPointRepository.updatePoint(frPoint.getFrPointId(), balance);
        }
        for (QuizResult quizResult : stageQuizSaveRequest.getQuizResultList()) {
            Quiz quiz = quizRepository.findById(quizResult.getQuizId())
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_QUIZ));
            Optional<QuizStatus> quizStatus= quizStatusRepository.findByMemberIdAndQuizId(memberId, quiz.getId());
            if (quizStatus.isEmpty()) {
                quizStatus = Optional.of(QuizStatus.createQuizStatus(child, quiz, quizResult.isCorrect()));
                quizStatusRepository.save(quizStatus.get());
            } else {
                if (quizResult.isCorrect()) {
                    quizStatus.get().modifyQuizStatus();
                }
            }
        }
        Optional<StageStatus> stageStatus = stageStatusRepository.findByMemberAndStage(child, stage);
        if (stageStatus.isEmpty()) {
            stageStatus = Optional.of(StageStatus.createStageStatus(stage, child, true));
            child.modifyFuel();
            stageStatusRepository.save(stageStatus.get());
        } else {
            if (!stageStatus.get().isPassed()) child.modifyFuel();
            stageStatus.get().modifyStageStatus();
        }
    }

}
