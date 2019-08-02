package com.soccermatching.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.CharacterEncodingFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final String USERNAME_QUERY = "select id, password, enabled FROM member WHERE id like ?";
	private final String AUTHORITIES_BY_USERNAME_QUERY = "select id, role FROM member WHERE id like ?";

	@Autowired
	private DataSource dataSource;

	@Autowired
	private AuthenticationFailureHandler authenticationFailureHandler;

	@Autowired
	private AuthenticationEntryPoint authenticationEntryPoint;

	@Autowired
	private AuthenticationSuccessHandler authenticationSuccessHandler;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// POST 요청시, csrf토큰을 보내기 때문에 한글이 깨질수 있으므로, 필터 적용.
		CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
		encodingFilter.setEncoding("UTF-8");
		encodingFilter.setForceEncoding(true);

		http.addFilterBefore(encodingFilter, CsrfFilter.class);

		http.csrf().disable().exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);

		http.formLogin().failureHandler(authenticationFailureHandler).successHandler(authenticationSuccessHandler)
				.loginPage("/main").usernameParameter("id").passwordParameter("password").and().authorizeRequests()
				.antMatchers("/admin").hasRole("ADMIN").antMatchers("/profile", "/match-register").authenticated().and()
				.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/main");
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication().dataSource(dataSource).usersByUsernameQuery(USERNAME_QUERY)
				.authoritiesByUsernameQuery(AUTHORITIES_BY_USERNAME_QUERY);
	}

}
