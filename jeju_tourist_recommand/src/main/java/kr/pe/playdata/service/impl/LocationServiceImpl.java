package kr.pe.playdata.service.impl;

import kr.pe.playdata.domain.VisitJejuLocation;
import kr.pe.playdata.repository.LocationMongoRepo;
import kr.pe.playdata.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {
    /*
        Location 서비스 구현체
     */

    @Autowired
    private LocationMongoRepo locationMongoRepo;

    public List<VisitJejuLocation> findNear(Point p, Distance d){
        return locationMongoRepo.findByLocationNear(p, d);
    }
}
