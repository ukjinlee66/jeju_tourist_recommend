package kr.pe.playdata.domain;

import lombok.Data;

@Data
public class NaverContent {
    /*
        블로그에 대한 정보가 담겨 있는 vo
     */

    private String title;       // 블로그 제목
    private String postdate;    // 블로그 업로드 날짜
    private String link;        // 블로그 링크
    private String description; // 블로그 간략 설명
}
