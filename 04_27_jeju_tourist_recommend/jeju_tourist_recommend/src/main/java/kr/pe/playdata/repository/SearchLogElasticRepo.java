package kr.pe.playdata.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import kr.pe.playdata.domain.SearchRank;

//@Repository
public interface SearchLogElasticRepo extends ElasticsearchRepository<SearchRank, String> {
	
	

}
