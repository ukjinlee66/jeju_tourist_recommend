package kr.pe.playdata.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import kr.pe.playdata.domain.TourClickLog;

public interface ClickLogElasticRepo extends ElasticsearchRepository<TourClickLog, String> {
	

}
