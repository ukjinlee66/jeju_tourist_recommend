package kr.pe.playdata.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
public class Naver {
	/*
	 * 관광지 상세페이지에 나타낼 네이버 블로그 정보
	 */
	@Id
	private String id;
	private String touristName;	// 관광지 이름
	private List<NaverContent> contents; // 게시글들
}