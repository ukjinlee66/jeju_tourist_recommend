package kr.pe.playdata.service;

import kr.pe.playdata.domain.VisitJejuLocation;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;

import java.util.List;

public interface LocationService {
    /*
        Location 서비스 인터페이스
     */

    public List<VisitJejuLocation> findNear(Point p, Distance d);
}