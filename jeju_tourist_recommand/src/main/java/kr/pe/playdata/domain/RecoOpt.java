package kr.pe.playdata.domain;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class RecoOpt {
	/*
	 * 추천 option을 나타내는 DAO
	 */
	
	@Id
	private String id;		// id
	private String option;	// option keyword
}
