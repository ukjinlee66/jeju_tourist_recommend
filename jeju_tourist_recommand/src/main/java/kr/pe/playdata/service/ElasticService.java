package kr.pe.playdata.service;

import java.util.List;

import kr.pe.playdata.domain.SearchRank;
import kr.pe.playdata.domain.TourClickLog;

public interface ElasticService {
	
	SearchRank insertSearchLog(String search);
	
	List<SearchRank> insertKeywordListLog(String search);
	
	TourClickLog insertClickLog(String tourName);
	
}
