package kr.pe.playdata.service;


import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import kr.pe.playdata.domain.testModel;

import java.util.List;
import java.util.Optional;

public interface TestService {
    public List<testModel> findAll();
    public Optional<testModel> findByColumn1(String s);
    public List<testModel> findByColumn1Like(String s);
}
