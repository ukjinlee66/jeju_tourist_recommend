package kr.pe.playdata.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection ="visitJeju")
public class visitJejuList {
    /*
     * 검색 후 또는 추천 이후의 VO
     */

    @Id
    private String id;				// id
    private String tour;			// 관광지 이름
    private String sub_title;		// 부제목, 관광지에 대한 짧은 설명
    private String tag_prev;		// 비짓제주 태그
    private String tag_next;		// 비짓제주 태그
    private String img;				// 이미지 링크
}
