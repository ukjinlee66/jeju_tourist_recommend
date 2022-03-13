package kr.pe.playdata.domain;

import lombok.Data;

@Data
public class NaverBlog {
	/*
	 * 관광지 상세페이지에 나타낼 네이버 블로그 정보
	 */
	
	String touristName;	// 관광지 이름
	String touristInfo; // 관광지 정보
	String postName;	// 게시글 이름
	String postDate; 	// 게시글 날짜
	String url;			// 네이버 url
}