package kr.pe.playdata.controller;

import kr.pe.playdata.domain.InstaRank;
import kr.pe.playdata.domain.SearchRank;
import kr.pe.playdata.service.KeywordRankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rank")
public class KeywordRankController {
    /*
        검색, 인스타 키워드 랭킹 컨트롤러
     */

    @Autowired
    private KeywordRankService service;

    @GetMapping("/searchKeyword")
    public List<SearchRank> getTopFiveSearchKeywords(){
        return service.getTopFiveSearchKeywords();          // 상위 5개의 검색어를 가져온다.
    }

    @GetMapping("/instaKeyword")
    public List<InstaRank> getTopFiveInstaKeywords(){
        return service.getTopFiveInstaKeywords();           // 상위 5개의 인스타 키워드를 가져온다.
    }
}
