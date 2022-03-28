package kr.pe.playdata.service;

import kr.pe.playdata.domain.visitJeju;
import kr.pe.playdata.domain.visitJejuList;
import kr.pe.playdata.domain.visitJejuRandomImg;

import java.util.List;
import java.util.Optional;

public interface TouristAttractionService {
    /*

     */

    public Optional<visitJeju> findById(String id);
    public List<visitJejuList> findByTourLike(String tour);
    public List<visitJejuList> search(String search);
    public List<visitJejuRandomImg> randomTour();
}