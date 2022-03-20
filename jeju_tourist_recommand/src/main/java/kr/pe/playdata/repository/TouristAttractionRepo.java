package kr.pe.playdata.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import kr.pe.playdata.domain.visitJeju;

@Repository
public interface TouristAttractionRepo extends MongoRepository<visitJeju, String>{
	public List<visitJeju> findByTouristName(String touristName);
	public List<visitJeju> findAll();
}
