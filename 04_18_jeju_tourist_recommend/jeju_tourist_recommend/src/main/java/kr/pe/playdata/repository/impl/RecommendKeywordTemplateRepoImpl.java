package kr.pe.playdata.repository.impl;

import kr.pe.playdata.domain.RecommendKeyword;
import kr.pe.playdata.repository.RecommendKeywordTemplateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RecommendKeywordTemplateRepoImpl implements RecommendKeywordTemplateRepo {
    /*
        RecommendKeyword 템플릿 레포
     */

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<RecommendKeyword> random() {
        SampleOperation matchStaget = Aggregation.sample(12);
        Aggregation aggregation = Aggregation.newAggregation(matchStaget);
        AggregationResults<RecommendKeyword> output = mongoTemplate.aggregate(aggregation, "keyword", RecommendKeyword.class);
        List<RecommendKeyword> li = output.getMappedResults();
        return li;
    }
}