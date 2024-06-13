package ssafy.hico.domain.book.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ssafy.hico.domain.book.dto.request.BookAddRequest;
import ssafy.hico.domain.book.entity.BookPage;
import ssafy.hico.domain.book.repository.BookRepository;
import ssafy.hico.domain.stage.entity.Stage;
import ssafy.hico.domain.stage.repository.StageRepository;
import ssafy.hico.global.response.error.ErrorCode;
import ssafy.hico.global.response.error.exception.CustomException;

@Service
@Component
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final StageRepository stageRepository;

    private final String[] tts = {
            "옛날 옛적에, 미국이라는 나라는 지금보다 훨씬 작았어요. 그런데 어느 날, 미국의 대통령 제퍼슨 씨가 프랑스 나라와 큰 거래를 했어요. 루이지애나라는 넓은 땅을 사서 미국을 두 배로 키웠답니다. 이 땅을 사고 나서 많은 사람들이 새로운 집을 찾아 서쪽으로 여행을 시작했어요. 그들은 가족과 짐을 마차에 싣고, 서쪽으로 향하며 새로운 농장을 만들고, 그곳을 자신들의 집으로 만들었지요.",
            "1848년에는 캘리포니아에서 금이 발견되었어요. '금이 나왔다!'는 소식을 듣자마자, 많은 사람들이 금을 찾기 위해 캘리포니아로 달려갔어요. 그들은 금을 찾아 부자가 되고 싶었답니다. 사람들은 금을 캐며 행복해했고, 그 덕분에 새로운 도시가 생겨나고 많은 사람들이 살게 되었어요.",
            "그 후, 사람들은 더 멀리, 더 빠르게 이동하고 싶어했어요. 그래서 거대한 철도를 만들기로 했지요. 많은 사람들이 모여 철도를 만들었고, 마침내 대륙을 가로질러 이어지는 긴 철도가 완성되었어요. 이 철도 덕분에 사람들은 더 빠르게 여행할 수 있게 되었고, 물건들도 멀리까지 보낼 수 있게 되었답니다.",
            "하지만, 새로운 땅을 찾아가는 과정에서, 이미 그 땅에 살고 있던 인디언들과 만나기도 했어요. 인디언들은 '이 땅은 우리 조상들로부터 물려받은 땅이에요'라고 말했지요. 하지만 개척자들과 인디언들 사이에는 서로를 이해하지 못하는 일들이 많았고, 때로는 싸움도 일어났어요. 결국 인디언들은 많이 슬퍼하며 예약지로 이사를 가야만 했답니다.",
            "마지막으로, 새로운 마을들이 생기기 시작했고, 마을마다 보안관이 임명되어 마을의 질서를 지키게 되었어요. 보안관은 나쁜 사람들을 잡아 마을을 안전하게 만들었지요. 사람들은 서로 도와가며 마을을 지키고, 덕분에 서부에는 평화와 번영이 찾아왔답니다.",
            "오랜 옛날, 미국에는 큰 다툼이 있었어요. 남부의 사람들이 '우리는 혼자서 잘 살 수 있어'라며 탈퇴하겠다는 서류에 서명했어요. 북부의 큰 회의장에서 이 소식을 듣고 많은 사람들이 깜짝 놀랐어요. 한 분이 '이건 우리가 나뉘기 시작하는 거야!'라고 크게 말했어요. 집에서는 가족들이 이 소식을 듣고, 아버지가 '우리 집 앞마당까지 싸움이 올 것 같아...'라고 걱정했어요. 그리고 북부와 남부의 지도자들이 서로를 굳게 응시하며, 아무도 물러서지 않았어요. 그저 두 사람 사이의 긴장만이 느껴졌답니다.",
            "전쟁이 시작되었고, 많은 병사들이 싸움터로 떠났어요. 정부에서는 전쟁을 위해 돈과 채권을 많이 찍어냈어요. 한 사람이 '이것으로 충분할까?'라고 걱정했어요. 시장에서는 물건값이 하루아침에 올라버려, 사람들이 '어제와 가격이 왜 달라졌어?'라며 놀랐어요. 남부에서는 한 가족이 지갑을 열어보며 '이 돈으론 아무것도 살 수 없다...'라고 한숨 쉬었어요.",
            "전쟁 때문에 많은 농장이 파괴되고, 공장도 멈춰 섰어요. 한 사람이 '여기서는 더 이상 살 수 없어...'라며 슬퍼했어요. 많은 사람들이 집을 떠나야 했고, 어린 아이가 '우리 집은 어디에 있는 거야?'라고 물었어요. 하지만 희망을 잃지 않은 한 농민이 다시 땅을 일구며 '우리는 다시 시작해야 해...'라고 말했어요.",
            "전쟁 동안 북부에서는 많은 공장이 분주하게 돌아갔어요. 한 공장장이 '주문이 너무 많아!'라고 말했어요. 시장에서는 사람들이 많은 물건을 사려고 줄을 서고, 한 상인이 '물가가 또 올랐네...'라고 투덜거렸어요. 여성들도 공장에서 일하며 '전쟁 덕분에 우리도 일자리를 갖게 됐어.'라고 말했어요. 한 경제학자는 그래프를 가리키며 '전쟁이 경제를 살렸지만, 물가도 많이 올렸어요.'라고 설명했어요.",
            "전쟁이 끝나고 사람들은 폐허 위에서 새로운 희망을 찾았어요. 남부에서는 사람들이 다시 집과 도시를 짓기 시작했고, 한 건축가가 '우리의 힘으로 이곳을 다시 흥하게 할 수 있어.'라고 말했어요. 북부에서는 전쟁 후 경제를 안정시키기 위한 큰 회의가 열렸어요. 한 정치인이 '경제를 안정시키는 건 평화를 유지하는 데 정말 중요해.'라고 말했어요. 마지막으로 남북의 대표들이 서로 손을 맞잡으며, 배경으로는 다시 지어지는 도시와 농촌이 보였어요. 그들의 손잡음에서 남북이 다시 하나가 되려는 희망의 메시지가 전해졌답니다."
    };

    public void addBook(BookAddRequest bookAddRequest, String fileName) {
        Stage stage = stageRepository.findById(bookAddRequest.getStageId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STAGE));
        BookPage book = bookAddRequest.createBook(fileName, stage);
        bookRepository.save(book);
    }

    public void addBook(BookAddRequest bookAddRequest, String fileName, int index) {
        Stage stage = stageRepository.findById(bookAddRequest.getStageId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_STAGE));
        BookPage book = bookAddRequest.createBook(fileName, stage, tts[index]);
        bookRepository.save(book);
    }

}
