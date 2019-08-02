package com.soccermatching.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soccermatching.dao.MatchApplyDAO;
import com.soccermatching.dao.MatchBoardDAO;
import com.soccermatching.dto.DailyMatchCountDTO;
import com.soccermatching.dto.MatchApplyDTO;
import com.soccermatching.dto.MatchBoardDTO;

@RestController
@RequestMapping("/api/match-boards")
public class MatchBoardController {

	@Autowired
	private MatchBoardDAO matchBoardDAO;
	
	@Autowired
	private MatchApplyDAO matchApplyDAO;

	@GetMapping
	public List<MatchBoardDTO> getAll() {
		List<MatchBoardDTO> matchBoardDTOList = new ArrayList<>();
		List<MatchApplyDTO> matchApplyDTOCountList = matchApplyDAO.readAppliedAll();
		
		for (MatchBoardDTO matchBoardDTO : matchBoardDAO.readAll()) {
			int numberAppliable = matchBoardDTO.getNumberAppliable();
			
			matchBoardDTO.setCurrentAppliable(numberAppliable);
			
			for (MatchApplyDTO matchApplyDTO : matchApplyDTOCountList) {
				if (matchBoardDTO.getNumber() == matchApplyDTO.getMatchBoardNumber()) {
					int appliedCount = matchApplyDTO.getAppliedCount();
					
					matchBoardDTO.setCurrentAppliable(numberAppliable - appliedCount);
				}
			}
			
			matchBoardDTOList.add(matchBoardDTO);
		}
		
		
		return matchBoardDTOList;
	}
	
	@GetMapping("{number}")
	public MatchBoardDTO getOne(@PathVariable("number") int number) {
		MatchApplyDTO matchApplyDTO = matchApplyDAO.readApplied(number);
		MatchBoardDTO matchBoardDTO = matchBoardDAO.read(number);

		int numberAppliable = matchBoardDTO.getNumberAppliable();
		int currentAppliable = (matchApplyDTO == null) ? numberAppliable : numberAppliable - matchApplyDAO.readApplied(number).getAppliedCount();
		
		matchBoardDTO.setCurrentAppliable(currentAppliable);
		
		return matchBoardDTO;
	}
	
	@GetMapping("author/{author}")
	public List<MatchBoardDTO> registerList(@PathVariable("author") int author) {
		return matchBoardDAO.readRegisteredList(author);
	}
	
	@GetMapping("daily-match-count")
	public List<DailyMatchCountDTO> getDailyMatchCount() {
		return matchBoardDAO.readDailyMatchCount();
	}

	@PutMapping("{number}")
	public void modify(@PathVariable("number") int number, @RequestBody Map<String, Object> map) {
		String address = (String) map.get("address");
		String detailAddress = (String) map.get("detail_address");
		String placeName = (String) map.get("place_name");
		Date date = (Date) map.get("date");
		String startTime = (String) map.get("start_time");
		String startTimeMinutes = (String) map.get("start_time_minutes");
		String endTime = (String) map.get("end_time");
		String endTimeMinutes = (String) map.get("end_time_minutes");
		String gameType = (String) map.get("game_type");
		String gender = (String) map.get("gender");
		int numberAppliable = (int) map.get("number_appliable");
		String detailInfo = (String) map.get("detail_info");
		String x = (String) map.get("x");
		String y = (String) map.get("y");

		matchBoardDAO.update(address, detailAddress, placeName, date, startTime, startTimeMinutes, endTime,
				endTimeMinutes, gameType, gender, numberAppliable, detailInfo, x, y, number);
	}
	
	@DeleteMapping("{number}")
	public void remove(@PathVariable("number") int number) {
		matchBoardDAO.delete(number);
	}

}
