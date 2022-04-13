package kr.pe.playdata.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.annotations.ApiIgnore;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    /*
        swagger config
        http://localhost:8080/swagger-ui/index.html로 접속 가능
     */

    @Bean
    public Docket swaggerApi(){
        return new Docket(DocumentationType.SWAGGER_2).ignoredParameterTypes(ApiIgnore.class)
                .apiInfo(swaggerInfo()).select()
                .apis(RequestHandlerSelectors.basePackage("kr.pe.playdata.controller"))
                .build()
                .useDefaultResponseMessages(false);
    }

    private ApiInfo swaggerInfo() {
        return new ApiInfoBuilder().title("API Documentation")
                .description("제주들려섬 API 문서 ")
                .license("license : 제주들렸섬").licenseUrl("http://playdata.io/").build();
    }
}
