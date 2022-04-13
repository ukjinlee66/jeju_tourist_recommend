package kr.pe.playdata.controller;

import kr.pe.playdata.domain.VisitJeju;
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

    @GetMapping("/chatbot")
    public CompletableFuture<String> recommend(@RequestParam String sentence) {
        return recommendService.recommend(sentence);
    }
    @GetMapping("/relation")
    public CompletableFuture<List<VisitJeju>> relation(@RequestParam String sentence){
        return recommendService.relation(sentence);
    }
}