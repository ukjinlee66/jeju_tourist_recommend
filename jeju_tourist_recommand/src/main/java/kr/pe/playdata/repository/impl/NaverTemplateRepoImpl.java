package kr.pe.playdata.repository.impl;

import kr.pe.playdata.domain.Naver;
import kr.pe.playdata.repository.NaverTemplateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NaverTemplateRepoImpl implements NaverTemplateRepo {
    /*
        Naver 템플릿 레포지토리 구현
     */

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Naver> getTwoRecent(String source) {
        MatchOperation match = Aggregation.match(Criteria.where("source").is(source));
        UnwindOperation unwindOperation = Aggregation.unwind("contents");
        SortOperation sort = Aggregation.sort(Sort.Direction.DESC, "contents.postdate");
        LimitOperation limit = Aggregation.limit(2);
        Aggregation aggregation = Aggregation.newAggregation(match, unwindOperation, sort, limit);

        AggregationResults<Naver> output = mongoTemplate.aggregate(aggregation, "naver", Naver.class);
        List<Naver> li = output.getMappedResults();
        return li;
    }
}
