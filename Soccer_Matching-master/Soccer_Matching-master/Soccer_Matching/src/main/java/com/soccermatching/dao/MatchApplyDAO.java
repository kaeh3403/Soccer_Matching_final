package com.soccermatching.dao;

import java.util.List;

import com.soccermatching.dto.MatchApplyDTO;
import com.soccermatching.dto.MatchBoardDTO;

public interface MatchApplyDAO {
	public List<MatchBoardDTO> readAppliedMatch(int memberNumber);
	
	public void create(MatchApplyDTO matchApplyDTO);
	
	public int count(int matchBoardNumber);
	
	public void cancel(int memberNumber, int matchBoardNumber);
	
	public List<MatchApplyDTO> readAppliedAll();
	
	public MatchApplyDTO readApplied(int matchBoardNumber);
}
