package kr.pe.playdata.service;

import kr.pe.playdata.domain.Blog;
import kr.pe.playdata.domain.Naver;

import java.util.List;

public interface BlogService {
    public List<Naver> getTwoRecent(String tour);
}
