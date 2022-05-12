package kr.pe.playdata.repository;

import kr.pe.playdata.domain.VisitJejuRandomImg;

import java.util.List;

public interface TouristAttractionTemplateRepo {
    /*
        VisitJeju 템플릿 레포
     */

    public List<VisitJejuRandomImg> random();       //랜덤으로 이미지를 가져옴
}
