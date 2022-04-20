package kr.pe.playdata.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kr.pe.playdata.domain.InstaRank;
import kr.pe.playdata.domain.RecommendKeyword;
import kr.pe.playdata.domain.SearchRank;
import kr.pe.playdata.service.KeywordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/keyword")
public class KeywordController {
    /*
        검색, 인스타 키워드 랭킹 컨트롤러
     */

    @Autowired
    private KeywordService service;

    @ApiOperation(value = "검색어 순위 조회", notes = "검색이 가장 많이 된 상위 5개의 검색어를 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/searchKeyword")
    public List<SearchRank> getTopFiveSearchKeywords(){
        return service.getTopFiveSearchKeywords();          // 상위 5개의 검색어를 가져온다.
    }

    @ApiOperation(value = "인스타 해쉬 태그 순위 조회", notes = "태그가 가장 많이 된 상위 5개 키워드 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/instaKeyword")
    public List<InstaRank> getTopFiveInstaKeywords(){
        return service.getTopFiveInstaKeywords();           // 상위 5개의 인스타 키워드를 가져온다.
    }

    @ApiOperation(value = "추천 키워드 10개 조회", notes = "랜덤으로 추천 키워드 10개를 가져온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/randomRecommendKeyword")
    public List<RecommendKeyword> getRandomRecommendKeywords(){
        return service.getRandomKeywords();
    }
}
