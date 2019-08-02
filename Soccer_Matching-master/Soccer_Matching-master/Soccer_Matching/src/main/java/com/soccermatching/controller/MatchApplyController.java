package com.soccermatching.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soccermatching.dao.MatchApplyDAO;
import com.soccermatching.dto.MatchBoardDTO;

@RestController
@RequestMapping("/api/match-applies")
public class MatchApplyController {
	
	@Autowired
	private MatchApplyDAO matchApplyDAO;
	
	@GetMapping("/member/{memberNumber}")
	public List<MatchBoardDTO> getApplies(@PathVariable("memberNumber") int memberNumber) {
		return matchApplyDAO.readAppliedMatch(memberNumber);
	}
	
	@DeleteMapping("/cancel")
	public void cancel(@RequestBody Map<String, Object> map) {
		int memberNumber = (int) map.get("memberNumber");
		int matchBoardNumber = (int) map.get("matchBoardNumber");
		
		matchApplyDAO.cancel(memberNumber, matchBoardNumber);
	}
	
}