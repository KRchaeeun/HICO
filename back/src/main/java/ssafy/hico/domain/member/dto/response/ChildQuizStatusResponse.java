package ssafy.hico.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChildQuizStatusResponse {
    private Long countryId;
    private String countryName;
    private String code;
    private int progressRate;
    private int correct;
}
