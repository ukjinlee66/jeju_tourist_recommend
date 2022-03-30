package kr.pe.playdata.repository.impl;

import kr.pe.playdata.domain.VisitJejuRandomImg;
import kr.pe.playdata.repository.TouristAttractionTemplateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TouristAttractionTemplateRepoImpl implements TouristAttractionTemplateRepo {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<VisitJejuRandomImg> random() {
        SampleOperation matchStaget = Aggregation.sample(5);
        Aggregation aggregation = Aggregation.newAggregation(matchStaget);
        AggregationResults<VisitJejuRandomImg> output = mongoTemplate.aggregate(aggregation, "visitJeju", VisitJejuRandomImg.class);
        List<VisitJejuRandomImg> li = output.getMappedResults();
        return li;
    }
}
