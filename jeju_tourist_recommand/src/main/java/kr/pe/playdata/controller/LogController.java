package kr.pe.playdata.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kr.pe.playdata.domain.SearchLog;
import kr.pe.playdata.domain.TourClickLog;
import kr.pe.playdata.service.ElasticService;

@RestController
@RequestMapping("/log") 
public class LogController {

    /*
    검색, 클릭 로그 컨트롤러
     */
	
	
	@Autowired
    private ElasticService esService;
	
    @ApiOperation(value = "검색어 입력", notes = "사용자가 입력한 검색어 저장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/searchKeyword")
    public SearchLog insertSearchKeyword(
    		@ApiParam(value = "검색어", required=false, example = "우도 가볼만한 곳")
            @RequestParam String search,
            @ApiParam(value = "로그분류", required=false, example = "searchLog")
            @RequestParam String logClass){
        return esService.insertSearchLog(search,logClass);			// 검색어를 elastic에 저장한다.          
    }

    @ApiOperation(value = "검색어 입력", notes = "사용자가 입력한 검색어 저장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/searchKeywordList")
    public List<SearchLog> insertSearchKeywordList(
    		@ApiParam(value = "키워드", required=false, example = "바다 아름다운 아이와함께")
            @RequestParam String search){
        return esService.insertKeywordListLog(search);			// 검색어를 elastic에 저장한다.          
    }
    
    @ApiOperation(value = "관광지 이름", notes = "사용자가 클릭한 관광지 이름 저장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/tourClickLog")
    public TourClickLog insertClickLog(
    		@ApiParam(value = "검색어", required=false, example = "아르떼뮤지엄")
            @RequestParam String source,
            @ApiParam(value = "경도", required=false, example = "126.8990639")
            @RequestParam String longitute,
            @ApiParam(value = "위도", required=false, example = "32.31223")
            @RequestParam String latitute) {
    		
           
        return esService.insertClickLog(source,longitute,latitute);			// 검색어를 elastic에 저장한다.          
    }

}
