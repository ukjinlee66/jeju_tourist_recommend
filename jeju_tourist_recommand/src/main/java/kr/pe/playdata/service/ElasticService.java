package kr.pe.playdata.service;

import kr.pe.playdata.domain.SearchRank;

public interface ElasticService {
	
	SearchRank insertSearch(String search);
	

}
