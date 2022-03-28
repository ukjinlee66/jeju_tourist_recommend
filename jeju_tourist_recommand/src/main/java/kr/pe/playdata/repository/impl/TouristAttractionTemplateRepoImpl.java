package kr.pe.playdata.repository.impl;

import kr.pe.playdata.domain.visitJejuRandomImg;
import kr.pe.playdata.repository.TouristAttractionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TouristAttractionTemplateRepoImpl implements TouristAttractionRepo {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<visitJejuRandomImg> random() {
        SampleOperation matchStaget = Aggregation.sample(5);
        Aggregation aggregation = Aggregation.newAggregation(matchStaget);
        AggregationResults<visitJejuRandomImg> output = mongoTemplate.aggregate(aggregation, "visitJeju", visitJejuRandomImg.class);
        List<visitJejuRandomImg> li = output.getMappedResults();
        return li;
    }
}
