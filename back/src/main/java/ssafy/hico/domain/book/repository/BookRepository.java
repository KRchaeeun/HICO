package ssafy.hico.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.hico.domain.book.entity.BookPage;

public interface BookRepository extends JpaRepository<BookPage, Long> {



}
