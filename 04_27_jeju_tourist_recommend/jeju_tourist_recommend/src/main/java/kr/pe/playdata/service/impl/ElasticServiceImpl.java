package kr.pe.playdata.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.elasticsearch.core.geo.GeoPoint;
import org.springframework.stereotype.Service;

import kr.pe.playdata.domain.SearchRank;
import kr.pe.playdata.domain.TourClickLog;
import kr.pe.playdata.repository.ClickLogElasticRepo;
import kr.pe.playdata.repository.SearchLogElasticRepo;
import kr.pe.playdata.service.ElasticService;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor  
//초기화 되지않은 final필드나, @NonNull이 붙은 필드에 생성자를 생성해 줌 / DI 편의성을 위해 사용
public class ElasticServiceImpl implements ElasticService{
	

	private final SearchLogElasticRepo searchLogElasticRepo;
	private final ClickLogElasticRepo clickLlogElasticRepo;
	
	public SearchRank insertSearchLog(String search) {	
		SearchRank searchRank = new SearchRank();
    	searchRank.setSearchName(search);
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
		searchRank.setSearchDate(sdf.format(new Date()));
    	
		searchLogElasticRepo.save(searchRank);	
		return searchRank;
	};
	
	public List<SearchRank> insertKeywordListLog(String keywords){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
		
		String[] key_inputs = keywords.split(",");
		List<SearchRank> keyList = new ArrayList<>();
		
		for(String key : key_inputs) {
			keyList.add(new SearchRank(key,sdf.format(new Date())));
		}
		
		searchLogElasticRepo.saveAll(keyList);
		return keyList;
	}
	
	public TourClickLog insertClickLog(String tourName, GeoPoint geoPoint) {	
		TourClickLog tourClickLog = new TourClickLog();
		tourClickLog.setTourName(tourName);
		tourClickLog.setLocation(geoPoint);
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
    	tourClickLog.setLogDate(sdf.format(new Date()));
    	
    	clickLlogElasticRepo.save(tourClickLog);	
		
		return tourClickLog;
	};
		
}
