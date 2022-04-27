package kr.pe.playdata.service;

import kr.pe.playdata.domain.InstaRank;
import kr.pe.playdata.domain.RecommendKeyword;
import kr.pe.playdata.domain.SearchRank;

import java.util.List;

public interface KeywordService {
    /*
        키워드 랭크 인터페이스
     */
	
    //public List<SearchRank> getTopFiveSearchKeywords();         // top5개의 검색어를 가져온다.
    public List<InstaRank> getTopFiveInstaKeywords();           // top5개의 인스타 키워드를 가져온다.
    public List<RecommendKeyword> getRandomKeywords();          // 10개의 랜덤 추천 키워드를 뽑아줌
}
