package kr.pe.playdata.service.impl;

import kr.pe.playdata.domain.VisitJejuLocation;
import kr.pe.playdata.repository.MapMongoRepo;
import kr.pe.playdata.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MapServiceImpl implements MapService {
    /*
        Location 서비스 구현체
     */

    @Autowired
    private MapMongoRepo mapMongoRepo;

    public List<VisitJejuLocation> findNear(Point p, Distance d){
        return mapMongoRepo.findByLocationNear(p, d);
    }
    public Optional<VisitJejuLocation> findBySource(String source){
        return mapMongoRepo.findBySource(source);
    }
}
