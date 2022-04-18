package kr.pe.playdata.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kr.pe.playdata.domain.VisitJeju;
import kr.pe.playdata.domain.VisitJejuList;
import kr.pe.playdata.domain.VisitJejuMap;
import kr.pe.playdata.domain.VisitJejuRandomImg;
import kr.pe.playdata.service.TouristAttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/source")
public class TouristController {
    /*
        tour와 관련된 controller
     */

    @Autowired
    private TouristAttractionService service;

    @ApiOperation(value = "id로 관광지 조회", notes = "id로 특정 관광지를 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/lookup")          // id로 관광지 검색
    public Optional<VisitJeju> lookUp(
            @ApiParam(value = "id", required=false, example = "6248479a6424f18efe7ec1b9")
            @RequestParam String id){
        return service.findById(id);    // null이 반환되는 경우 에러가 나지 않게 Optional을 사용
    }

    @ApiOperation(value = "검색어로 시작하는 관광지 이름 조회", notes = "검색어로 시작하는 관광지 이름 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
     @GetMapping("/searchBySource")    // 요청한 이름으로 시작하는 관광지
        public List<VisitJejuMap> searchBySource(
                @ApiParam(value = "검색어", required=false, example = "우도")
                @RequestParam String source){
            return service.findBySourceStartsWith(source);
    }

    @ApiOperation(value = "검색어가 들어간 관광지 조회", notes = "관광지의 이름, 상세정보 등에 검색어가 들어간 관광지 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/searchByCertainColumn")       // tour, sub_titile, tag_prev, tag_next, purpose,  etc_property, content 기준으로 검색
    public List<VisitJejuList> searchByCertainColumn(
            @ApiParam(value = "검색어", required=false, example = "우도")
            @RequestParam String search,
            @ApiParam(value = "페이지 수", required=false, example = "1")
            @RequestParam int page){
        return service.search(search, page);
    }

    @ApiOperation(value = "검색어가 들어간 관광지 개수 조회", notes = "관광지의 이름, 상세정보 등에 검색어가 들어간 관광지 개수 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/searchSize")
    public long searchSize(
            @ApiParam(value = "검색어", required=false, example = "우도")
            @RequestParam String search){
        return service.searchSize(search);
    }

    @ApiOperation(value = "관광지 랜덤으로 조회", notes = "관광지를 랜덤으로 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/random")              // id로 관광지 검색
    public List<VisitJejuRandomImg> random(){
        return service.randomTour();
    }
}