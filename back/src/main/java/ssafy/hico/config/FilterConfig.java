package ssafy.hico.config;

import jakarta.servlet.Filter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ssafy.hico.global.filter.CorsFilter;
import ssafy.hico.global.filter.JwtAuthenticationFilter;
import ssafy.hico.global.jwt.JwtTokenProvider;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean corsFilter() {
        FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new CorsFilter());
        filterRegistrationBean.setOrder(1);
        return filterRegistrationBean;
    }


    @Bean
    public FilterRegistrationBean<JwtAuthenticationFilter> jwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        FilterRegistrationBean<JwtAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new JwtAuthenticationFilter(jwtTokenProvider));
        registrationBean.setOrder(2);
        registrationBean.addUrlPatterns("/*"); // 모든 URL에 필터를 적용
        return registrationBean;
    }
}
