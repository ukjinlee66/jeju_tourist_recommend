package kr.pe.playdata.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.pe.playdata.domain.testModel;
import kr.pe.playdata.repository.testModelRepository;
import kr.pe.playdata.service.testService;

@Service
public class testServiceImpl implements testService{
	@Autowired
	private testModelRepository testModelRepo;
	
	public List<testModel> find(){
		return testModelRepo.findAll();
	}
}
