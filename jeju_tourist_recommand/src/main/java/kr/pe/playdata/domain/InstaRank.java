package kr.pe.playdata.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class InstaRank {

    @Id
    private String id;
    private String keyword;
    private String cnt;
}
