package kr.pe.playdata.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kr.pe.playdata.domain.Naver;
import kr.pe.playdata.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Blog")
public class BlogController {
    /*
        블로그 컨트롤러
     */

    @Autowired
    private BlogService blogService;

    @ApiOperation(value = "최신 블로그 검색", notes = "특정 관광지와 관련된 가장 최신의 블로그 2개를 검색")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/recentTwo")
    public List<Naver> blogRecentTwo(
            @ApiParam(value = "관광지 이름", required=false, example = "우도(해양도립공원)")
            @RequestParam String source){
        return blogService.getTwoRecent(source);
    }
}
