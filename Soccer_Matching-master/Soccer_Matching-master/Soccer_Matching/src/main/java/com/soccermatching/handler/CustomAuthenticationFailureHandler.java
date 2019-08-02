package com.soccermatching.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

/**
 * 
 * @description : 로그인 시 아이디 또는 패스워드가 틀릴 시 인증 에러
 *
 */
@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		response.addHeader("Exception", exception.getMessage());
		
		response.sendRedirect("main");
	}

}
