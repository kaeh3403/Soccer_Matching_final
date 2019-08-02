package com.soccermatching.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.soccermatching.dao.MatchApplyDAO;
import com.soccermatching.dao.MatchBoardDAO;
import com.soccermatching.dao.MemberDAO;
import com.soccermatching.dto.MatchApplyDTO;
import com.soccermatching.dto.MatchBoardDTO;

@Controller
@RequestMapping("/match-board")
public class MatchResultController {

	@Autowired
	private MemberDAO memberDAO;

	@Autowired
	private MatchApplyDAO matchApplyDAO;

	@Autowired
	private MatchBoardDAO matchBoardDAO;

	@GetMapping("{number}")
	public String get(@PathVariable("number") int number) {
		return "main-match-result.html";
	}

	@PostMapping("{number}")
	public ResponseEntity<?> apply(Principal principal, @PathVariable("number") int number,
			RedirectAttributes redirectAttributes) {
		
		if (principal != null) {
			int memberNumber = memberDAO.read(principal.getName()).getNumber();

			MatchApplyDTO matchApplyDTO = new MatchApplyDTO();
			matchApplyDTO.setMemberNumber(memberNumber);
			matchApplyDTO.setMatchBoardNumber(number);

			matchApplyDAO.create(matchApplyDTO);

			redirectAttributes.addFlashAttribute("msg", "applySuccess");

			System.out.println(principal.getName() + ", " + number);
			
			return new ResponseEntity<>(1, HttpStatus.OK);
		}
		
		return new ResponseEntity<>(0, HttpStatus.OK);
	}

	@GetMapping("edit")
	public String get() {
		return "match-result.html";
	}

	@PostMapping
	public ResponseEntity<?> register(MatchApplyDTO matchApplyDTO, HttpServletResponse response) {
		System.out.println(matchApplyDTO);

		if (isAppliable(matchApplyDTO.getMatchBoardNumber())) {
			matchApplyDAO.create(matchApplyDTO);

			return new ResponseEntity<>(1, HttpStatus.OK);
		}

		return new ResponseEntity<>(0, HttpStatus.BAD_REQUEST);
	}

	@PutMapping("edit")
	public String update(Principal principal, MatchBoardDTO matchBoardDTO) {
		System.out.println(matchBoardDTO);
		matchBoardDTO.setAuthor(memberDAO.read(principal.getName()).getNumber());

		matchBoardDAO.update(matchBoardDTO, matchBoardDTO.getNumber());

		return "redirect:/profile";
	}

	@DeleteMapping("edit/{number}")
	public ResponseEntity<?> delete(@PathVariable("number") int number) {
		matchBoardDAO.delete(number);

		return new ResponseEntity<>(5, HttpStatus.OK);
	}

	@DeleteMapping("edit/cancel/{number}")
	public ResponseEntity<?> deleteApplied(Principal principal, @PathVariable("number") int number) {
		if (principal != null) {
			matchApplyDAO.cancel(memberDAO.read(principal.getName()).getNumber(), number);

			return new ResponseEntity<>(1, HttpStatus.OK);
		}

		return new ResponseEntity<>(0, HttpStatus.BAD_REQUEST);
	}

	private boolean isAppliable(int matchBoardNumber) {
		int numberAppliable = matchBoardDAO.readNumberAppliable(matchBoardNumber);
		int count = matchApplyDAO.count(matchBoardNumber);

		return numberAppliable - count > 0;
	}

}
