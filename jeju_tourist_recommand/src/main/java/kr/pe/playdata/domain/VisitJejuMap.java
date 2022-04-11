package kr.pe.playdata.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="visitJeju")
public class VisitJejuMap {
    /*
         map에서 쓰일 visitJeju VO
     */

    @Id
    private String id;                  // id
    private String source;              // 관광지 이름
    private Location location;          // 장소
    private String img;                 // 이미지
}
