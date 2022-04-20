package kr.pe.playdata.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="visitJeju")
public class VisitJejuRandomImg {
    /*
        Random으로 뽑은 img VO
     */

    @Id
    private String id;              // id
    private String img;             // img url
}
