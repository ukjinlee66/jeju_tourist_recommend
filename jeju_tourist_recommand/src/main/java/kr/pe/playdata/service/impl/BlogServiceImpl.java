package kr.pe.playdata.service.impl;

import kr.pe.playdata.domain.Naver;
import kr.pe.playdata.repository.NaverTemplateRepo;
import kr.pe.playdata.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {
    /*
        Blog Service 구현체
     */

    @Autowired
    private NaverTemplateRepo repo;
    public List<Naver> getTwoRecent(String tour){
        return repo.getTwoRecent(tour);
    }
}
