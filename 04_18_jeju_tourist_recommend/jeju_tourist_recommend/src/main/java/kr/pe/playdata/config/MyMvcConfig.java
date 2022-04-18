package kr.pe.playdata.config;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.core.env.Environment;
import org.springframework.context.annotation.Configuration;

import javax.annotation.Resource;

@Configuration
@EnableWebMvc
public class MyMvcConfig implements WebMvcConfigurer {
    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {"classpath:/static/", "classpath:/public/"};

    @Resource
    private Environment env;

    // 정적 리소스는 보통 제한없이(로그인이 필요없는) 서비스되도록 설정한다.
    // 정적 리소스의 디폴트 루트는 /resources/static
    // 예를 들어 /resources/static/main.html은 http://localhost:8080/main.html으로 볼 수 있다.
    // 시큐리티가 적용되면 필터에 의해 모두 차단되므로 필터 예외 설정한다.
    // .antMatchers("/static/**").permitAll()

    // 요청된 URL 경로와 물리적인 저장 경로를 매핑하는 역할
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);
    }


    // 컨트롤러 작성 없이 특정 뷰로 이동하기
    // 여기서는 /app/** 패턴은 다시 SPA(react-router)가 처리하도록 포워딩한다.
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/jeju/**").setViewName("forward:/index.html");
    }
}
