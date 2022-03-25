package kr.pe.playdata.service;

import kr.pe.playdata.domain.InstaRank;
import kr.pe.playdata.domain.SearchRank;

import java.util.List;

public interface KeywordRankService {
    public List<SearchRank> getTopFiveSearchKeywords();
    public List<InstaRank> getTopFiveInstaKeywords();
}
