package kr.pe.playdata.service;

import kr.pe.playdata.domain.VisitJeju;
import kr.pe.playdata.domain.VisitJejuList;
import kr.pe.playdata.domain.VisitJejuRandomImg;

import java.util.List;
import java.util.Optional;

public interface TouristAttractionService {
    /*
        관광지 서비스 인터페이스
     */

    public Optional<VisitJeju> findById(String id);
    public List<VisitJejuList> findByTourLike(String tour);
    public List<VisitJejuList> search(String search, int page);
    public long searchSize(String search);
    public List<VisitJejuRandomImg> randomTour();
}