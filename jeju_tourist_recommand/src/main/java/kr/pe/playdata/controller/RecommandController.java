package kr.pe.playdata.controller;

import kr.pe.playdata.service.RecommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/recommand")
public class RecommandController {

    @Autowired
    private RecommandService recommandService;

    @GetMapping("/chatbot")
    public CompletableFuture<String> recommand(@RequestParam String keywords) {
        return recommandService.recommand(keywords);
    }
}