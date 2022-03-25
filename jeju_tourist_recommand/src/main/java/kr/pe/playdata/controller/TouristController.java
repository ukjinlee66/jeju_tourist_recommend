package kr.pe.playdata.controller;

import kr.pe.playdata.domain.visitJeju;
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
    /*
     tour와 관련된 controller
     */

    @Autowired
    private TouristAttractionService service;

    @GetMapping("/findAll")
    public List<visitJeju> findAll(){
        return service.findAll();
    }

    @GetMapping("/lookup")          // id로 관광지 검색
    public Optional<visitJeju> lookUp(@RequestParam String id){
        return service.findById(id);    // null이 반환되는 경우 에러가 나지 않게 Optional을 사용
    }


    @GetMapping("/searchByTourName")    // 요청한 이름과 관련된 관광지 검색
    public List<visitJeju> searchByTourName(@RequestParam String tour){
        return service.findByTourLike(tour);    //
    }

    @GetMapping("/searchByCertainColumn")       // tour, sub_titile, tag_prev, tag_next, purpose,  etc_property, content 기준으로 검색
    public List<visitJeju> searchByCertainColumn(@RequestParam String search){
        return service.search(search);
    }
}