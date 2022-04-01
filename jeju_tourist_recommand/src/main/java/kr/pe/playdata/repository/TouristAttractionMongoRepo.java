package kr.pe.playdata.repository;

import java.util.List;
import java.util.Optional;

import kr.pe.playdata.domain.VisitJejuList;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import kr.pe.playdata.domain.VisitJeju;

@Repository
public interface TouristAttractionMongoRepo extends MongoRepository<VisitJeju, String>{
	/*
		관광지 정보를 관리하는 레포지토리
	 */

	public Optional<VisitJeju> findById(String id);			// id 기준으로 관광지 조회

	@Query(fields="{tour:1, sub_title:1, tag_prev:1, tag_next:1, img:1}")
	public List<VisitJejuList> findByTourLike(String tour);		// Tour 이름 기준으로 관광지 조회

	@Query(value = "{$or:[{'tour':{$regex:?0,$options:'i'}},{'sub_title':{$regex:?0,$options:'i'}}," +
			"{'tag_prev':{$regex:?0,$options:'i'}}, {'tag_next':{$regex:?0,$options:'i'}}," +
			"{'purpose':{$regex:?0,$options:'i'}}, {'etc_property':{$regex:?0,$options:'i'}}," +
			" {'content':{$regex:?0,$options:'i'}}]}", fields="{tour:1, sub_title:1, tag_prev:1, tag_next:1, img:1}")  // value는 있어도 되고 없어도 된다.
	public List<VisitJejuList> search(String regexString, Pageable pageable);		// 특정 column들 기준으로 검색
}