package kr.pe.playdata.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="visitJeju")
public class VisitJejuLocation {
    /*
            visitJeju의 location VO
     */

    @Id
    private String id;
    private String tour;
    private Location location;
}