package com.soccermatching.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.soccermatching.dao.ApplicantDAO;
import com.soccermatching.dao.MatchApplyDAO;
import com.soccermatching.dao.MatchBoardDAO;
import com.soccermatching.dao.MemberDAO;
import com.soccermatching.dto.ApplicantDTO;
import com.soccermatching.dto.MatchBoardDTO;
import com.soccermatching.dto.MemberDTO;

@Controller
@RequestMapping("/profile")
public class ProfileController {

	@Autowired
	private MemberDAO memberDAO;

	@Autowired
	private MatchBoardDAO matchBoardDAO;

	@Autowired
	private MatchApplyDAO matchApplyDAO;

	@Autowired
	private ApplicantDAO applicantDAO;

	@GetMapping
	public String get(Principal principal, HttpServletResponse response) {
		if (principal != null) {

			MemberDTO memberDTO = memberDAO.read(principal.getName());

			response.addHeader("Member-Number", String.valueOf(memberDTO.getNumber()));

		}

		return "mypage.html";
	}

	@GetMapping("info")
	public @ResponseBody List<JsonNode> getInfo(Principal principal) throws JsonProcessingException {
		MemberDTO memberDTO = memberDAO.read(principal.getName());
		int number = memberDTO.getNumber();
		
		return createProfileInfo(number);
	}

	private List<JsonNode> createProfileInfo(int number) {
		List<JsonNode> jsonNodes = new ArrayList<>();

		Map<String, String> map1 = new HashMap<>();
		map1.put("name", memberDAO.read(number).getId());

		Map<String, List<MatchBoardDTO>> map2 = new HashMap<>();
		map2.put("apply", matchApplyDAO.readAppliedMatch(number));

		List<MatchBoardDTO> newMatchBoardDTOList = new ArrayList<>();

		for (MatchBoardDTO matchBoardDTO : matchBoardDAO.readRegisteredList(number)) {
			int matchBoardNumber = matchBoardDTO.getNumber();

			List<ApplicantDTO> applicantDTOList = applicantDAO.read(number);

			List<ApplicantDTO> applicants = new ArrayList<>();

			for (ApplicantDTO applicantDTO : applicantDTOList) {
				if (matchBoardNumber == applicantDTO.getMatchBoardNumber()) {
					applicants.add(applicantDTO);
				}
			}

			if (!applicants.isEmpty()) {
				matchBoardDTO.setApplicants(applicants);
			}

			newMatchBoardDTOList.add(matchBoardDTO);
		}

		map2.put("register", newMatchBoardDTOList);

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			String str1 = objectMapper.writeValueAsString(map1);
			String str2 = objectMapper.writeValueAsString(map2);

			JsonNode jsonNode1 = objectMapper.readTree(str1);
			JsonNode jsonNode2 = objectMapper.readTree(str2);

			jsonNodes.add(jsonNode1);
			jsonNodes.add(jsonNode2);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return jsonNodes;
	}

}
