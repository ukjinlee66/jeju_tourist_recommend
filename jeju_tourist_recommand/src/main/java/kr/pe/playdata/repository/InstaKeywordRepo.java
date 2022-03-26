package kr.pe.playdata.repository;

import kr.pe.playdata.domain.InstaRank;
import kr.pe.playdata.domain.SearchRank;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstaKeywordRepo extends MongoRepository<InstaRank, String> {
    @Query(sort = "{cnt : -1}")
    public List<InstaRank> findBy(Pageable pageable);
}
