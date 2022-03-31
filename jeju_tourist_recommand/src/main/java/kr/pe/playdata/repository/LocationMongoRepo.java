package kr.pe.playdata.repository;

import kr.pe.playdata.domain.VisitJejuLocation;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationMongoRepo extends MongoRepository<VisitJejuLocation, String> {
    /*
        Location Repo
     */

    List<VisitJejuLocation> findByLocationNear(Point p, Distance d);
}