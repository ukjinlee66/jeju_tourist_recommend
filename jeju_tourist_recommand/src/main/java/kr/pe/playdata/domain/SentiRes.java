package kr.pe.playdata.domain;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class SentiRes {
	/*
	 * 특정 키워드에 대한 감정 분석 결과를 담은 객체
	 */
	
	@Id
	String id;          // id
	boolean sentiment; // 긍정,부정을 나타냄
	String keyword;		// 키워드
}
