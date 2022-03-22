package kr.pe.playdata.Repository;

import kr.pe.playdata.domain.testModel;
import kr.pe.playdata.repository.TestModelRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class TouristRepoTest {
    @Autowired
    private TestModelRepository repo;

    @Test
    public void findAll(){
        List<testModel> res = repo.findAll();
        assertThat(res.size()).isEqualTo(2);
    }
}
