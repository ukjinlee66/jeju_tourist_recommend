package kr.pe.playdata.service.impl;

import kr.pe.playdata.service.RecommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.util.concurrent.CompletableFuture;

@Service
public class RecommandServiceImpl implements RecommandService {
    /*
        관광지를 추천해주는 서비스 구현체
     */

    @Autowired
    private RestTemplate restTemplate;

    @Async("asyncExecutor")
    public CompletableFuture<String> recommand(String keywords){
        String url = "http://127.0.0.1:5000/recommand";
        MultiValueMap<String, String> param = new LinkedMultiValueMap<String, String>();
        param.add("keywords",keywords);
        String sb = restTemplate.postForObject(url, param, String.class);
        return CompletableFuture.completedFuture(sb);
    }
}
