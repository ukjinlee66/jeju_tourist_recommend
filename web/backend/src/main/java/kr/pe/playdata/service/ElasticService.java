package kr.pe.playdata.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.elasticsearch.core.geo.GeoPoint;

import kr.pe.playdata.domain.SearchLog;
import kr.pe.playdata.domain.TourClickLog;

public interface ElasticService {
	
	SearchLog insertSearchLog(String search, String logClass);
	
	List<SearchLog> insertKeywordListLog(String search);
	
	TourClickLog insertClickLog(String tourName, String longitute, String latitute);
	
}
