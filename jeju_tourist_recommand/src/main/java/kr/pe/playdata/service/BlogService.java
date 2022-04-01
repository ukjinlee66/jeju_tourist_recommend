package kr.pe.playdata.service;

import kr.pe.playdata.domain.Naver;

import java.util.List;

public interface BlogService {
    /*
        블로그 서비스 인터페이스
     */

    public List<Naver> getTwoRecent(String tour);
}
