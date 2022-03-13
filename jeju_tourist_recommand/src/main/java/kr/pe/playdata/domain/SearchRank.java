package kr.pe.playdata.domain;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class SearchRank {
	/*
	 * 		검색어 순위
	 */
	
	@Id
	String id;
	String searchName;
	int cnt;
}