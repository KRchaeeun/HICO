package ssafy.hico.domain.book.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.book.entity.BookPage;
import ssafy.hico.domain.stage.entity.Stage;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookAddRequest {

    private long stageId;
    private int pageNum;

    public BookPage createBook(String fileName, Stage stage) {
        return BookPage.builder()
                .bookPageNum(this.pageNum)
                .bookPageImg(fileName)
                .stage(stage)
                .build();
    }

    public BookPage createBook(String fileName, Stage stage, String tts) {
        return BookPage.builder()
                .bookPageNum(this.pageNum)
                .bookPageImg(fileName)
                .stage(stage)
                .tts(tts)
                .build();
    }

}
