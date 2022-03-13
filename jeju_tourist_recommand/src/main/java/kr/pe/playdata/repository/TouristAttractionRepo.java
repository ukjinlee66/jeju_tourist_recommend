package kr.pe.playdata.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import kr.pe.playdata.domain.TouristAttraction;

@Repository
public interface TouristAttractionRepo extends MongoRepository<TouristAttraction, String>{
	public List<TouristAttraction> findByTouristName(String touristName);
	List<TouristAttraction> findAll();
}
