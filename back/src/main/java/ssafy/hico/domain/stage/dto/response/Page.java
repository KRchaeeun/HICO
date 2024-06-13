package ssafy.hico.domain.stage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.book.entity.BookPage;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Page {

    private long pageId;
    private String pageImg;
    private int pageNum;
    private String tts;

    public Page(BookPage bookPage) {
        this.pageId = bookPage.getBookPageId();
        this.pageImg = bookPage.getBookPageImg();
        this.pageNum = bookPage.getBookPageNum();
        this.tts = bookPage.getTts();
    }

}
