package kr.pe.playdata.service.impl;

import kr.pe.playdata.domain.visitJeju;
import kr.pe.playdata.domain.visitJejuList;
import kr.pe.playdata.domain.visitJejuRandomImg;
import kr.pe.playdata.repository.TouristAttractionMongoRepo;
import kr.pe.playdata.repository.TouristAttractionRepo;
import kr.pe.playdata.service.TouristAttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TouristAttaractionServiceImpl implements TouristAttractionService {

    @Autowired
    private TouristAttractionMongoRepo touristMongoRepo;

    @Autowired
    private TouristAttractionRepo repo;


    public Optional<visitJeju> findById(String id){
        Optional<visitJeju> jeju = touristMongoRepo.findById(id);
        return jeju;
    }

    public List<visitJejuList> findByTourLike(String tour){
        return touristMongoRepo.findByTourLike(tour);
    }

    public List<visitJejuList> search(String search){
        return touristMongoRepo.search(search);
    }

    public List<visitJejuRandomImg> randomTour(){
        List<visitJejuRandomImg> tour = repo.random();
        return tour;
    }
}