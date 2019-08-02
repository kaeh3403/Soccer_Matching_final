package com.soccermatching.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.soccermatching.dao.MatchBoardDAO;
import com.soccermatching.dao.MemberDAO;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private MemberDAO memberDAO;

	@Autowired
	private MatchBoardDAO matchBoardDAO;

	@GetMapping
	public String get(Model model) {
		model.addAttribute("memberDTOList", memberDAO.readAll());
		model.addAttribute("matchDTOList", matchBoardDAO.readAll());
		
		return "admin.jsp";
	}

}
