package kr.pe.playdata.service.impl;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.BucketOrder;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Service;

import kr.pe.playdata.service.HighLevelClientElasticService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HighLevelClientElasticServiceImpl implements HighLevelClientElasticService {
	
	private final RestHighLevelClient restHighLevelClient;
	
	public List<String> getTopFiveSearchKeywords(String term, String logclass){
		
		// 현재로 부터 하루 전의 시간을 구함
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
		cal.add(Calendar.DATE, -1);
		String date = sdf.format(cal.getTime());
		
		// 검색을 위한 request객체 생성
		SearchRequest searchRequest = new SearchRequest("searchlog");
		SearchSourceBuilder sourceBuilder = SearchSourceBuilder.searchSource();
		// 검색어 집계를 위한 aggregation 생성
		TermsAggregationBuilder terms = AggregationBuilders.terms(term).field(term);
		// 하루동안의 검색어를 가지고 오기위한 query 생성
		QueryBuilder q1 = QueryBuilders.matchQuery("logClass", logclass);
		QueryBuilder q2 = QueryBuilders.rangeQuery("searchDate").gt(date);
		BoolQueryBuilder boolQuery = new BoolQueryBuilder();
		boolQuery.must(q1);
		boolQuery.must(q2);
		
		System.out.println(boolQuery);
		sourceBuilder.size(0);
		sourceBuilder.query(boolQuery);
		
		sourceBuilder.aggregation(terms);
		
		searchRequest.source(sourceBuilder);
		try {
			Map<String, Long> result = new HashMap<>();
			SearchResponse response = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
			List<Aggregation> aggregations = response.getAggregations().asList();
			aggregations
				.forEach(aggregation->{
					((Terms) aggregation).getBuckets()
						.forEach(bucket -> result.put(bucket.getKeyAsString(), bucket.getDocCount()));
				});
			System.out.println(aggregations);
			// Map.Entry 리스트
			List<Entry<String, Long>> entryList = new ArrayList<Entry<String, Long>>(result.entrySet());
			System.out.println(entryList);
			// Comparator를 사용하여 정렬
			Collections.sort(entryList, new Comparator<Entry<String, Long>>(){
				
				public int compare(Entry<String, Long> obj1, Entry<String, Long> obj2) {
					
					// 오름차순 정렬
					// return obj1.getValue().compareTo(obj2.getValue());
					// 내림차순 정렬
					return obj2.getValue().compareTo(obj1.getValue());
				}
			});
			List<String> result_list = new ArrayList<String>();
			
			// 상위 5개 검색어 리스트로 저장
			int count = 0;
			for (Entry<String, Long> entry : entryList) {
				if (entry.getKey().equals("")){
					continue;
				}
				else count++;
				
				if (count>5) break;
				System.out.println(entry.getKey()+":"+entry.getValue());
				result_list.add(entry.getKey());
			}
			
			return result_list;
		} catch(IOException e) {
			e.printStackTrace();	
		}
		
		return null;
	}

}
