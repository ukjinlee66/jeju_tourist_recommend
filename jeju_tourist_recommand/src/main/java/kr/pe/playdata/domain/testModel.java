package kr.pe.playdata.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection ="testModel")
public class testModel {

    @Id
	String id;
    String column1;
    String column2;
}
