package kr.pe.playdata.domain;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class RealtimeKeyword {
	/*
	 * 	실시간 검색어 키워드
	 */
	
	@Id	
	private String id;
	private String keyword;
}