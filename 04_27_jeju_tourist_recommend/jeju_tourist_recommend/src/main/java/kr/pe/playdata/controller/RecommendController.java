package kr.pe.playdata.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kr.pe.playdata.domain.VisitJejuList;
import kr.pe.playdata.service.RecommendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/recommend")
public class RecommendController {
    @Autowired
    private RecommendService recommendService;

    @ApiOperation(value = "관광지 하나를 추천해줌", notes = "챗봇과의 대화형태로 관광지 추천")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/chatbot")
    public CompletableFuture<String> recommend(
            @ApiParam(value = "사용자 입력", required=false, example = "관광지 하나 추천해줘")
            @RequestParam String sentence) {
        return recommendService.recommend(sentence);
    }

    @ApiOperation(value = "관광지 하나를 추천해줌", notes = "keyword를 기반으로 관광지 추천")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/relation")
    public CompletableFuture<List<VisitJejuList>> relation(
            @ApiParam(value = "사용자 입력", required=false, example = "드라이브")
            @RequestParam String sentence){
        return recommendService.relation(sentence);
    }
}