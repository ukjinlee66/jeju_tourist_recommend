package kr.pe.playdata.service;

import java.util.concurrent.CompletableFuture;

public interface RecommandService {
    /*
        관광지 추천 서비스 인터페이스
     */

    public CompletableFuture<String> recommand(String keywords);
}
