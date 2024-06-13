package ssafy.hico.domain.book.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.hico.domain.book.dto.request.BookAddRequest;
import ssafy.hico.domain.book.service.BookService;
import ssafy.hico.domain.book.service.S3Uploader;
import ssafy.hico.global.response.success.SuccessCode;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

import static ssafy.hico.global.response.success.CommonResponseEntity.getResponseEntity;

@Slf4j
@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {

    private final S3Uploader s3Uploader;
    private final BookService bookService;

    @PostMapping("/upload")
    public ResponseEntity<?> bookAdd(@RequestPart(value = "bookAddRequest") BookAddRequest bookAddRequest,
                                     @RequestPart(value = "bookImg", required = false) MultipartFile multipartFile) {
        String fileName = "";
        if (multipartFile != null) {
            try {
                fileName = s3Uploader.upload(multipartFile, "books");
                bookService.addBook(bookAddRequest, fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return getResponseEntity(SuccessCode.OK);
    }

    @GetMapping("/start")
    public ResponseEntity<?> bookStart() {
        String path = Paths.get("").toAbsolutePath().toString() + "/src/main/resources/img/";
        int index = 0;
        for (int stage = 1; stage <= 2; stage++) {
            for (int page = 1; page <= 5; page++) {
                BookAddRequest bookAddRequest = new BookAddRequest(stage, page);
                File file = new File(path + "stage" + stage + "_" + page + ".png");
                String fileName = s3Uploader.upload(file, "books");
                bookService.addBook(bookAddRequest, fileName, index++);
            }
        }
        return getResponseEntity(SuccessCode.OK);
    }


}
