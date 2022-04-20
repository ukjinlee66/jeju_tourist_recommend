package kr.pe.playdata.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection ="naver")      // 없어도 된다.
public class Naver {
    /*
        관광지 별로 네이버 블로그들을 담는 VO
     */

    @Id
    private String id;              // id
    private String source;          // 관광지 이름
    private Blog contents;          // 블로그 contents
}