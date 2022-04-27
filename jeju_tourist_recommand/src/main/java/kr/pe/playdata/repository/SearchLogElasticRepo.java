package kr.pe.playdata.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import kr.pe.playdata.domain.SearchLog;

//@Repository
public interface SearchLogElasticRepo extends ElasticsearchRepository<SearchLog, String> {
	
	

}
