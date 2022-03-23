package kr.pe.playdata.service.impl;

import kr.pe.playdata.domain.visitJeju;
import kr.pe.playdata.repository.TouristAttractionRepo;
import kr.pe.playdata.service.TouristAttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TouristAttaractionServiceImpl implements TouristAttractionService {

    @Autowired
    private TouristAttractionRepo touristRepo;

    public List<visitJeju> findAll(){
        return touristRepo.findAll();
    }

    public Optional<visitJeju> findById(String id){
        Optional<visitJeju> jeju = touristRepo.findById(id);
        return jeju;
    }

    public List<visitJeju> findByTourLike(String tour){
        return touristRepo.findByTourLike(tour);
    }
}