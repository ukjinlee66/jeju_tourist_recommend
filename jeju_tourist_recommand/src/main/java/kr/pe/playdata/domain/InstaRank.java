package kr.pe.playdata.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection ="insta")
public class InstaRank {

    @Id
    private String id;
    private String keyword;
    private int cnt;
}
