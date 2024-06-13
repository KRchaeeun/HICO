package ssafy.hico.domain.transaction.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class FrTransactionResponse {
    private List<ChildForeignTransactionResponse> frTranList;
    private Long totalElements;
    private int totalPages;
}
