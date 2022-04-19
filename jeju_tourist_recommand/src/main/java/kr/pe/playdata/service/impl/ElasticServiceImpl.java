package kr.pe.playdata.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Service;

import kr.pe.playdata.domain.SearchRank;
import kr.pe.playdata.repository.ElasticRepo;
import kr.pe.playdata.service.ElasticService;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor  
//초기화 되지않은 final필드나, @NonNull이 붙은 필드에 생성자를 생성해 줌 / DI 편의성을 위해 사용
public class ElasticServiceImpl implements ElasticService{
	

	private final ElasticRepo elasticRepo;
	
	public SearchRank insertSearch(String search) {	
		
		SearchRank searchRank = new SearchRank();
    	searchRank.setSearchName(search);
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
		searchRank.setSearchDate(sdf.format(new Date()));
    	
		elasticRepo.save(searchRank);	
		return searchRank;
	};

}
