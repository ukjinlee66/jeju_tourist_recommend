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

    @Autowired
    private KeywordRankService service;

//    @GetMapping("/insta")

    @GetMapping("/searchKeyword")
    public List<SearchRank> getTopFiveSearchKeywords(){
        return service.getTopFiveSearchKeywords();
    }

    @GetMapping("/instaKeyword")
    public List<InstaRank> getTopFiveInstaKeywords(){
        return service.getTopFiveInstaKeywords();
    }


}
