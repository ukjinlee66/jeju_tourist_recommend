package kr.pe.playdata.service;

import kr.pe.playdata.domain.visitJeju;

import java.util.List;
import java.util.Optional;

public interface TouristAttractionService {
    /*

     */


    public List<visitJeju> findAll();
    public Optional<visitJeju> findById(String id);
    public List<visitJeju> findByTourLike(String tour);
    public List<visitJeju> search(String search);
    public List<visitJeju> randomTour();
}