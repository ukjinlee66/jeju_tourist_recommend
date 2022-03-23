package kr.pe.playdata.controller;

import kr.pe.playdata.domain.testModel;
import kr.pe.playdata.domain.visitJeju;
import kr.pe.playdata.service.TestService;
import kr.pe.playdata.service.TouristAttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tour")
public class TouristController {
    @Autowired
    private TouristAttractionService service;

    @GetMapping("/findAll")
    public List<visitJeju> findAll(){
        return service.findAll();
    }
//    @GetMapping()
//    public List<visitJeju> search(){
//
//    }
    @GetMapping("/lookup")
    public Optional<visitJeju> lookUp(@RequestParam String id){
        return service.findById(id);
    }
}