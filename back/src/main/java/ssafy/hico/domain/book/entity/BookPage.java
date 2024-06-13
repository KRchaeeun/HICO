package ssafy.hico.domain.book.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.stage.entity.Stage;
import ssafy.hico.global.entity.BaseTimeEntity;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Entity
@NoArgsConstructor
public class BookPage extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookPageId;
    private int bookPageNum;
    private String bookPageImg;

    @Column(length = 1000)
    private String tts;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "stage_id")
    private Stage stage;

    @Builder
    public BookPage(int bookPageNum, String bookPageImg, Stage stage, String tts) {
        this.bookPageNum = bookPageNum;
        this.bookPageImg = bookPageImg;
        this.stage = stage;
        this.tts = tts;
    }

}
