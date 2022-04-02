package kr.pe.playdata.service;

import kr.pe.playdata.domain.VisitJejuLocation;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;

import java.util.List;
import java.util.Optional;

public interface MapService {
    /*
        Location 서비스 인터페이스
     */

    public List<VisitJejuLocation> findNear(Point p, Distance d);
    public Optional<VisitJejuLocation> findByTour(String tour);
}