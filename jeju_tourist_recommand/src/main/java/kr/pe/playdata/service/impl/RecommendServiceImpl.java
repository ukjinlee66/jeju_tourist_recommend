package kr.pe.playdata.service.impl;

import kr.pe.playdata.service.RecommendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.util.concurrent.CompletableFuture;

@Service
public class RecommendServiceImpl implements RecommendService {
    /*
        관광지를 추천해주는 서비스 구현체
     */

    @Autowired
    private RestTemplate restTemplate;

    @Async("asyncExecutor")
    public CompletableFuture<String> recommend(String sentence){
        String url = "http://127.0.0.1:5000/recommend";
        MultiValueMap<String, String> param = new LinkedMultiValueMap<String, String>();
        param.add("sentence", sentence);
        String sb = restTemplate.postForObject(url, param, String.class);
        return CompletableFuture.completedFuture(sb);
    }
}
