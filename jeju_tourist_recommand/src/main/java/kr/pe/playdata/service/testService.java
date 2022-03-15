package kr.pe.playdata.service;


import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import kr.pe.playdata.domain.testModel;

import java.util.List;

public interface testService {
    public List<testModel> find();
}
