package kr.pe.playdata.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {
    /*
        rest Config
     */

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
