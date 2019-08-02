package com.soccermatching.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.soccermatching.dao.MemberDAO;
import com.soccermatching.dto.MemberDTO;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
	
	@Autowired
	private MemberDAO memberDAO;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		MemberDTO memberDTO = memberDAO.read(authentication.getName());
		
		response.addHeader("Member-Number", String.valueOf(memberDTO.getNumber()));
		
		response.sendRedirect("/main");
	}

}
