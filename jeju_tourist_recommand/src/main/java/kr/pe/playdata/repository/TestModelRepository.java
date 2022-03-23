package kr.pe.playdata.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import kr.pe.playdata.domain.testModel;


@Repository
public interface TestModelRepository extends MongoRepository<testModel, String>{
	public List<testModel> findAll();
	public Optional<testModel> findByColumn1(String s);
	public List<testModel> findByColumn1Like(String s);
}