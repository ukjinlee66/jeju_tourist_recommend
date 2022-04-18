package kr.pe.playdata.repository;

import kr.pe.playdata.domain.RecommendKeyword;

import java.util.List;

public interface RecommendKeywordTemplateRepo {
    public List<RecommendKeyword> random();       //랜덤으로 추천 키워드를 가져옴
}
