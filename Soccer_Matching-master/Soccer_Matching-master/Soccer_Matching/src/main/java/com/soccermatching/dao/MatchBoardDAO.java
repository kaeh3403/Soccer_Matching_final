package com.soccermatching.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.soccermatching.dto.DailyMatchCountDTO;
import com.soccermatching.dto.MatchBoardDTO;

public interface MatchBoardDAO {

	public List<MatchBoardDTO> readAll();

	public MatchBoardDTO read(int number);

	public void create(MatchBoardDTO matchBoardDTO);
	
	public void update(MatchBoardDTO matchBoardDTO, int number);

	public void update(String address, String detailAddress, String placeName, Date date, String startTime,
			String startTimeMinutes, String endTime, String endTimeMinutes, String gameType, String gender,
			int numberAppliable, String detailInfo, String x, String y, int number);

	public void delete(int number);
	
	public List<MatchBoardDTO> readRegisteredList(int number);
	
	public List<DailyMatchCountDTO> readDailyMatchCount();

	public int readNumberAppliable(int number);

}
