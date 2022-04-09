package kr.pe.playdata.domain;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection ="naver")
public class Blog {
    /*
        블로그 VO
     */

    private String title;               // 제목
    private String postdate;
    private String link;
    private String description;
}