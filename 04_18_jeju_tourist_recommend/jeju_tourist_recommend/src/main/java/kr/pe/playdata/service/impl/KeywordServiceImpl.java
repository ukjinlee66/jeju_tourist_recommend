package kr.pe.playdata.service.impl;

import kr.pe.playdata.domain.InstaRank;
import kr.pe.playdata.domain.RecommendKeyword;
import kr.pe.playdata.domain.SearchRank;
import kr.pe.playdata.repository.InstaKeywordMongoRepo;
import kr.pe.playdata.repository.RecommendKeywordTemplateRepo;
import kr.pe.playdata.repository.SearchKeywordMongoRepo;
import kr.pe.playdata.service.KeywordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KeywordServiceImpl implements KeywordService {

    /*
            키워드 랭킹 서비스
     */

    @Autowired
    private SearchKeywordMongoRepo searchRepo;

    @Autowired
    private InstaKeywordMongoRepo instaRepo;

    @Autowired
    private RecommendKeywordTemplateRepo recommendKeywordTemplateRepo;

    public List<SearchRank> getTopFiveSearchKeywords(){
        return searchRepo.findBy(PageRequest.of(0,5));          //상위 5개를 뽑는다.
    }

    public List<InstaRank> getTopFiveInstaKeywords(){
        return instaRepo.findBy(PageRequest.of(0,5));           //인스타 상위 5개를 뽑는다.
    }

    public List<RecommendKeyword> getRandomKeywords(){
        return recommendKeywordTemplateRepo.random();
    }
}

