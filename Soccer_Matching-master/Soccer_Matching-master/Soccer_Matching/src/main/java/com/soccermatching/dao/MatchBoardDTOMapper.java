package com.soccermatching.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.soccermatching.dto.MatchBoardDTO;

public final class MatchBoardDTOMapper implements RowMapper<MatchBoardDTO> {

	@Override
	public MatchBoardDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
		MatchBoardDTO matchBoardDTO = new MatchBoardDTO();
		matchBoardDTO.setAddress(rs.getString("address"));
		matchBoardDTO.setAuthor(rs.getInt("author"));
		matchBoardDTO.setDate(rs.getDate("date"));
		matchBoardDTO.setDetailAddress(rs.getString("detail_address"));
		matchBoardDTO.setDetailInfo(rs.getString("detail_info"));
		matchBoardDTO.setEndTime(rs.getString("end_time"));
		matchBoardDTO.setEndTimeMinutes(rs.getString("end_time_minutes"));
		matchBoardDTO.setGameType(rs.getString("game_type"));
		matchBoardDTO.setGender(rs.getString("gender"));
		matchBoardDTO.setNumber(rs.getInt("number"));
		matchBoardDTO.setNumberAppliable(rs.getInt("number_appliable"));
		matchBoardDTO.setPlaceName(rs.getString("place_name"));
		matchBoardDTO.setRegisterDate(rs.getDate("register_date"));
		matchBoardDTO.setStartTime(rs.getString("start_time"));
		matchBoardDTO.setStartTimeMinutes(rs.getString("start_time_minutes"));
		matchBoardDTO.setX(rs.getString("x"));
		matchBoardDTO.setY(rs.getString("y"));

		return matchBoardDTO;
	}

}
