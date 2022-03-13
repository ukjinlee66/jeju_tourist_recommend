package kr.pe.playdata.domain;

import java.util.List;

import lombok.Data;

@Data
public class RecoOpt {
	/*
	 * 추천 option을 나타내는 DAO
	 */
	
	List<String> options;	// 추천 옵션들
}
