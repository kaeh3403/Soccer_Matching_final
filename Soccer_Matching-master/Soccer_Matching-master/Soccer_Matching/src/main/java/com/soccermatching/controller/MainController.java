package com.soccermatching.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.soccermatching.dao.MemberDAO;
import com.soccermatching.dto.MemberDTO;

@Controller
@RequestMapping("/main")
public class MainController {

	@GetMapping
	public String get(Principal principal, HttpServletResponse response) {
		return "main.jsp";
	}

}
