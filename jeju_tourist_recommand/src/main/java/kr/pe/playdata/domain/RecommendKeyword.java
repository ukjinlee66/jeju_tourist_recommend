package kr.pe.playdata.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="keyword")
public class RecommendKeyword {
    /*
           추천 키워드 VO
     */

    @Id
    private String id;
    private String keyword;
}
