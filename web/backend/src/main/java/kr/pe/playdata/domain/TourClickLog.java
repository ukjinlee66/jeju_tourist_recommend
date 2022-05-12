package kr.pe.playdata.domain;

import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.GeoPointField;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(indexName = "tourclicklog", createIndex = true)
public class TourClickLog {	

	@Id
	private String id;
	
	@Field(type = FieldType.Keyword)
    private String tourName;		// 검색어
	
	@Field(type = FieldType.Date)
	private String logDate;
	
	@GeoPointField
	private GeoPoint location;
}

