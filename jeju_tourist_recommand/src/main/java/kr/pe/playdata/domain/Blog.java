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
    private String postdate;            // 게시글 날짜
    private String link;                // url
    private String description;         // 요약 설명
}