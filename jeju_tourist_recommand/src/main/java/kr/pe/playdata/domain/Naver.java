package kr.pe.playdata.domain;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Naver {
    /*
        관광지 별로 네이버 블로그들을 담는 VO
     */

    @Id
    private String id;
    private String source;
    private List<Blog> contents;
}