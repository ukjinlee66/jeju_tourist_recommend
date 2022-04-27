package kr.pe.playdata.domain;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(indexName = "searchlog", createIndex = true)
public class SearchLog {
	/*
	 * 		검색어 순위
	 */
	
	@Id
	private String id;				// id
	//private String searchName;		
	
	@Field(type = FieldType.Keyword)
    private String searchName;		// 검색어
	
	@Field(type = FieldType.Keyword)
	private String logClass;
	
	@Field(type = FieldType.Date)
	private String searchDate;
	
	public SearchLog(String searchName, String searchDate, String logClass){
		
		this.searchName = searchName;
		this.searchDate = searchDate;
		this.logClass = logClass;
	}
}