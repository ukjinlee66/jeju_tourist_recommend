package kr.pe.playdata.config;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
//@EnableElasticsearchRepositories
public class ElasticConfig extends AbstractElasticsearchConfiguration{

	@Override
	@Bean
	public RestHighLevelClient elasticsearchClient() {
		// 클러스터 주소를 제공하기 위해 builder를 사용한다.
		final ClientConfiguration clientConfiguration = ClientConfiguration.builder().
				 connectedTo("15.164.116.162:9200")
		        .withConnectTimeout(1)
		        .withSocketTimeout(1)
		        .build();
		
		
		return RestClients.create(clientConfiguration).rest();
	}
	
	

}
