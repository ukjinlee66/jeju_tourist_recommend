package kr.pe.playdata.controller;

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

    @GetMapping("/recentTwo")
    public List<Naver> blogRecentTwo(@RequestParam String tour){
        return blogService.getTwoRecent(tour);
    }
}
