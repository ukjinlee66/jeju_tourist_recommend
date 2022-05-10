package kr.pe.playdata.service;

import java.util.List;
import java.util.Map;

public interface HighLevelClientElasticService {
	
	//Map<String, Long> getTopFiveSearchKeywords(String term);
	List<String> getTopFiveSearchKeywords(String term, String logName);
}
