package kr.pe.playdata.service.impl;

import kr.pe.playdata.domain.visitJeju;
import kr.pe.playdata.repository.TouristAttractionRepo;
import kr.pe.playdata.service.TouristAttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<visitJeju> search(String search){
        return touristRepo.search(search);
    }

    public List<visitJeju> randomTour(){
        List<visitJeju> tempTour = touristRepo.findAll();
        List<visitJeju> random = new ArrayList<visitJeju>();
        for(int i=0; i<4; i++){
            int random_num = (int)(10000*Math.random())%tempTour.size();
            random.add(tempTour.get(i));
        }
        return random;
    }
}