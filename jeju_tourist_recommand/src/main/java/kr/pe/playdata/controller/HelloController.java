package kr.pe.playdata.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.pe.playdata.domain.testModel;
import kr.pe.playdata.service.testService;

import java.util.List;

@RestController
@RequestMapping("/test")
public class HelloController {
	
	@Autowired
	private testService service;

	@GetMapping("/hello")
	public List<testModel> hello() {
		System.out.println("here is controller");
		List<testModel> li = service.find();
		return li;
	}
}