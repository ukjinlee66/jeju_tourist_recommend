package kr.pe.playdata.domain;

import lombok.Data;

@Data
public class Blog {
    /*
        블로그 VO
     */

    private String title;
    private String postdate;
    private String link;
    private String description;
}