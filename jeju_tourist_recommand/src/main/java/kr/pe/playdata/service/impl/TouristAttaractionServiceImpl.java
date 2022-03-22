package kr.pe.playdata.service.impl;

import kr.pe.playdata.domain.visitJeju;
import kr.pe.playdata.repository.TouristAttractionRepo;
import kr.pe.playdata.service.TouristAttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TouristAttaractionServiceImpl implements TouristAttractionService {

    @Autowired
    private TouristAttractionRepo touristRepo;

    public List<visitJeju> findAll(){
        return touristRepo.findAll();
    }
}
