package kr.pe.playdata.service;

import kr.pe.playdata.domain.SearchRank;

import java.util.List;

public interface KeywordRankService {
    public List<SearchRank> getTopFiveSearchKeywords();
}
