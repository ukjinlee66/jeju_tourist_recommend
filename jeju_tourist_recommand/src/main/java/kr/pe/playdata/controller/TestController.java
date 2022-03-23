package kr.pe.playdata.controller;

import kr.pe.playdata.domain.visitJeju;
import kr.pe.playdata.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.pe.playdata.domain.testModel;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/test")
public class TestController {
	
	@Autowired
	private TestService service;

	@GetMapping("/hello")
	public List<testModel> hello() {
		System.out.println("here is controller");
		List<testModel> li = service.findAll();
		return li;
	}

	@GetMapping("/lookup")
	public Optional<testModel> lookUp(@RequestParam String column1) {
		return service.findByColumn1(column1);
	}

	@GetMapping("/search")
	public List<testModel> search(@RequestParam String column1) {
		return service.findByColumn1Like(column1);
	}
}