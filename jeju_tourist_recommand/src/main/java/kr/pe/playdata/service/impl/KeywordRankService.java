package kr.pe.playdata.service.impl;

import kr.pe.playdata.domain.InstaRank;
import kr.pe.playdata.domain.SearchRank;
import kr.pe.playdata.repository.InstaKeywordRepo;
import kr.pe.playdata.repository.SearchKeywordRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KeywordRankService implements kr.pe.playdata.service.KeywordRankService {

    @Autowired
    private SearchKeywordRepo searchRepo;

    @Autowired
    private InstaKeywordRepo instaRepo;

    public List<SearchRank> getTopFiveSearchKeywords(){
        return searchRepo.findTop5ByAll();
    }

    public List<InstaRank> getTopFiveInstaKeywords(){
        return instaRepo.findTopy5ByAll();
    }
}
