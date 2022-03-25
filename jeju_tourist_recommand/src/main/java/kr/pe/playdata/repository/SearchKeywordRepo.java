package kr.pe.playdata.repository;

import kr.pe.playdata.domain.SearchRank;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchKeywordRepo extends MongoRepository<SearchRank, String>{
    public SearchRank findBySearchName();

    @Query(sort = "{cnt:-1}")
    public List<SearchRank> findTop5ByAll();
}
