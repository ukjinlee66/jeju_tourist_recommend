package kr.pe.playdata.domain;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "keyword")
public class SearchRank {
	/*
	 * 		검색어 순위
	 */
	
	@Id
	private String id;
	private String searchName;
//	private int cnt;
}