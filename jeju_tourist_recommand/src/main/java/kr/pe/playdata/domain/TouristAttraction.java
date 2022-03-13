package kr.pe.playdata.domain;

import lombok.Data;

@Data
public class TouristAttraction {
	/*
	 * 관광지에 대한 정보를 담고 있는 DAO
	 */
	
	String touristName;	// 관광지 이름
	String touristInfo;	// 관광지 정보
	String contentsCl;		// ?
	String addr;			// 관광지 주소
	String roadAddr;		// 관광지 도로명 주소
	String imageName;		// 관광지 이미지 이름
	float latitude;			// 위도
	float longtitude;		// 경도
}