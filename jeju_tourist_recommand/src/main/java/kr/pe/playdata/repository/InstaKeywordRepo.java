package kr.pe.playdata.repository;

import kr.pe.playdata.domain.InstaRank;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface InstaKeywordRepo {

    @Query(sort = "{cnt:-1}")
    public List<InstaRank> findTopy5ByAll();
}
