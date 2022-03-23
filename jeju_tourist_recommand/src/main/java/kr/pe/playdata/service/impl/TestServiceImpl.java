package kr.pe.playdata.service.impl;

import java.util.List;
import java.util.Optional;

import kr.pe.playdata.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.pe.playdata.domain.testModel;
import kr.pe.playdata.repository.TestModelRepository;

@Service
public class TestServiceImpl implements TestService {
	@Autowired
	private TestModelRepository testModelRepo;
	
	public List<testModel> findAll(){
		return testModelRepo.findAll();
	}
	public Optional<testModel> findByColumn1(String s){
		return testModelRepo.findByColumn1(s);
	}
	public List<testModel> findByColumn1Like(String s){
		return testModelRepo.findByColumn1Like(s);
	}
}
