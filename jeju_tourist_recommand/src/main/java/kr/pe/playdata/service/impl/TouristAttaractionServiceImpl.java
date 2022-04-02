package kr.pe.playdata.service.impl;

import kr.pe.playdata.domain.VisitJeju;
import kr.pe.playdata.domain.VisitJejuList;
import kr.pe.playdata.domain.VisitJejuMap;
import kr.pe.playdata.domain.VisitJejuRandomImg;
import kr.pe.playdata.repository.TouristAttractionMongoRepo;
import kr.pe.playdata.repository.TouristAttractionTemplateRepo;
import kr.pe.playdata.service.TouristAttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TouristAttaractionServiceImpl implements TouristAttractionService {
/*
    visitJeju 서비스 구현체
 */

    @Autowired
    private TouristAttractionMongoRepo touristMongoRepo;

    @Autowired
    private TouristAttractionTemplateRepo repo;


    public Optional<VisitJeju> findById(String id){
        Optional<VisitJeju> jeju = touristMongoRepo.findById(id);
        return jeju;
    }

    public List<VisitJejuMap> findByTourStartsWith(String tour){
        return touristMongoRepo.findByTourStartsWith(tour);
    }

    public List<VisitJejuList> search(String search, int page){
        return touristMongoRepo.search(search, PageRequest.of(page-1,5));
    }

    public long searchSize(String search){
        return touristMongoRepo.searchCount(search);
    }

    public List<VisitJejuRandomImg> randomTour(){
        List<VisitJejuRandomImg> tour = repo.random();
        return tour;
    }
}