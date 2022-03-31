package kr.pe.playdata.repository;

import kr.pe.playdata.domain.Blog;
import kr.pe.playdata.domain.Naver;

import java.util.List;

public interface NaverTemplateRepo {
    public List<Naver> getTwoRecent(String tour);
}
