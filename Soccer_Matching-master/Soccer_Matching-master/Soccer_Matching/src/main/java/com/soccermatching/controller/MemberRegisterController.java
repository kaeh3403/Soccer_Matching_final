package com.soccermatching.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.soccermatching.dao.MemberDAO;
import com.soccermatching.dto.MemberDTO;

@Controller
@RequestMapping("/register")
public class MemberRegisterController {

	@Autowired
	private MemberDAO memberDAO;

	@GetMapping
	public String get() {
		return "member-register.html";
	}

	@PostMapping
	public String register(MemberDTO memberDTO, HttpServletResponse response) {
		System.out.println(memberDTO);
		
		memberDAO.create(memberDTO);
		
		response.addHeader("msg", String.valueOf(1));

		return "redirect:/";
	}

}
