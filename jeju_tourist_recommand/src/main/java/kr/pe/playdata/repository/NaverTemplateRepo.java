package kr.pe.playdata.repository;

import kr.pe.playdata.domain.Naver;

import java.util.List;

public interface NaverTemplateRepo {
    /*
        네이버 블로그 Repo
     */

    public List<Naver> getTwoRecent(String tour);   // 최근 2개의 블로그 가져옴
}
