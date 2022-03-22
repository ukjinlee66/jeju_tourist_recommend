package kr.pe.playdata.service.impl;

import java.util.List;

import kr.pe.playdata.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.pe.playdata.domain.testModel;
import kr.pe.playdata.repository.TestModelRepository;

@Service
public class TestServiceImpl implements TestService {
	@Autowired
	private TestModelRepository testModelRepo;
	
	public List<testModel> find(){
		return testModelRepo.findAll();
	}
}
