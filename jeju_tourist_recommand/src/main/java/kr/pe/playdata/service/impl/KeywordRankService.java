package kr.pe.playdata.service.impl;

import kr.pe.playdata.domain.SearchRank;
import kr.pe.playdata.repository.SearchKeywordRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KeywordRankService implements kr.pe.playdata.service.KeywordRankService {

    @Autowired
    SearchKeywordRepo repo;

    public List<SearchRank> getTopFiveSearchKeywords(){
        return repo.findTop5ByAll();
    }
}
