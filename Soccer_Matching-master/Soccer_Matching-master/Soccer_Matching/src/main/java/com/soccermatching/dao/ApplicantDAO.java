package com.soccermatching.dao;

import java.util.List;

import com.soccermatching.dto.ApplicantDTO;

public interface ApplicantDAO {
	
	public List<ApplicantDTO> read(int author);

}
