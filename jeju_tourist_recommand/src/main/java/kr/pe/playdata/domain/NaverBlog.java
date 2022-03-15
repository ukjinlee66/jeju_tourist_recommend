package kr.pe.playdata.domain;

import lombok.Data;

@Data
public class NaverBlog {
	/*
	 * 관광지 상세페이지에 나타낼 네이버 블로그 정보
	 */
	
	private String touristName;	// 관광지 이름
	private String touristInfo; // 관광지 정보
	private String postName;	// 게시글 이름
	private String postDate; 	// 게시글 날짜
	private String url;			// 네이버 url
}