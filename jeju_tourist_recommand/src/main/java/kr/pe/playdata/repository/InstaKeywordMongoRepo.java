package kr.pe.playdata.repository;

import kr.pe.playdata.domain.InstaRank;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstaKeywordMongoRepo extends MongoRepository<InstaRank, String> {
    /*
        인스타 키워드에 대한 레포지토리
     */

    @Query(sort = "{cnt : -1}", fields = "{keyword : 1}")
    public List<InstaRank> findBy(Pageable pageable);       // cnt 많은 기준으로 top n 개를 가져온다.
}
