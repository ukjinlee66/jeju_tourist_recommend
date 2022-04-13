package kr.pe.playdata.service;

import kr.pe.playdata.domain.VisitJeju;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface RecommendService {
    /*
        관광지 추천 서비스 인터페이스
     */
    public CompletableFuture<String> recommend(String sentence);
    public CompletableFuture<List<VisitJeju>> relation(String sentence);
}
