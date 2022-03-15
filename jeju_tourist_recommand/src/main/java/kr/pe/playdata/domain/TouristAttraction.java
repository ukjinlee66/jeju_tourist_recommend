package kr.pe.playdata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection ="TouristAttraction")
public class TouristAttraction {
	/*
	 * 관광지에 대한 정보를 담고 있는 DAO(공공데이터)
	 */
	
	@Id
	private String id;				// id
	private String touristName;		// 관광지 이름
	private String touristInfo;		// visisJeju contents
	private String contentsClass;	// 관광지 업태명
	private String addr;			// 관광지 주소
	private String roadAddr;		// 관광지 도로명 주소
	private String imageName;		// 관광지 이미지 이름
	private float latitude;			// 위도
	private float longtitude;		// 경도
}
