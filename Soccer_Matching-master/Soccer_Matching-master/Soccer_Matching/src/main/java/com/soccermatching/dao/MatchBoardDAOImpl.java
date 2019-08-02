package com.soccermatching.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.soccermatching.dto.DailyMatchCountDTO;
import com.soccermatching.dto.MatchBoardDTO;

@Repository
public class MatchBoardDAOImpl implements MatchBoardDAO {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public List<MatchBoardDTO> readAll() {
		return jdbcTemplate.query("select * from match_board", new MatchBoardDTOMapper());
	}

	@Override
	public MatchBoardDTO read(int number) {
		try {
			return jdbcTemplate.queryForObject("select * from match_board where number = ?", new MatchBoardDTOMapper(),
					number);
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}

	@Override
	public void create(MatchBoardDTO matchBoardDTO) {
		jdbcTemplate.update(
				"insert into match_board (author, address, detail_address, place_name, date, start_time, start_time_minutes, end_time, end_time_minutes, game_type, gender, detail_info, number_appliable, x, y) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
				matchBoardDTO.getAuthor(), matchBoardDTO.getAddress(), matchBoardDTO.getDetailAddress(),
				matchBoardDTO.getPlaceName(), matchBoardDTO.getDate(), matchBoardDTO.getStartTime(),
				matchBoardDTO.getStartTimeMinutes(), matchBoardDTO.getEndTime(), matchBoardDTO.getEndTimeMinutes(),
				matchBoardDTO.getGameType(), matchBoardDTO.getGender(), matchBoardDTO.getDetailInfo(),
				matchBoardDTO.getNumberAppliable(), matchBoardDTO.getX(), matchBoardDTO.getY());
	}

	@Override
	public void update(MatchBoardDTO matchBoardDTO, int number) {
		jdbcTemplate.update(
				"update match_board set address = ?, place_name = ?, date = ?, start_time = ?, start_time_minutes = ?, end_time = ?, end_time_minutes = ?, game_type = ?, gender = ?, number_appliable = ?, detail_info = ?, x = ?, y = ? where number = ?",
				matchBoardDTO.getAddress(), matchBoardDTO.getPlaceName(), matchBoardDTO.getDate(),
				matchBoardDTO.getStartTime(), matchBoardDTO.getStartTimeMinutes(), matchBoardDTO.getEndTime(),
				matchBoardDTO.getEndTimeMinutes(), matchBoardDTO.getGameType(), matchBoardDTO.getGender(),
				matchBoardDTO.getNumberAppliable(), matchBoardDTO.getDetailInfo(), matchBoardDTO.getX(),
				matchBoardDTO.getY(), matchBoardDTO.getNumber());
	}

	@Override
	public void update(String address, String detailAddress, String placeName, Date date, String startTime,
			String startTimeMinutes, String endTime, String endTimeMinutes, String gameType, String gender,
			int numberAppliable, String detailInfo, String x, String y, int number) {

		jdbcTemplate.update(
				"update match_board set address = ?, detail_address = ?, place_name = ?, date = ?, start_time = ?, start_time_minutes = ?, end_time = ?, end_time_minutes = ?, game_type = ?, gender = ?, number_appliable = ?, detail_info = ?, x = ?, y = ? where number = ?",
				address, detailAddress, placeName, date, startTime, startTimeMinutes, endTime, endTimeMinutes, gameType,
				gender, numberAppliable, detailInfo, x, y, number);

	}

	@Override
	public void delete(int number) {
		jdbcTemplate.update("delete from match_board where number = ?", number);
	}

	@Override
	public List<MatchBoardDTO> readRegisteredList(int number) {
		return jdbcTemplate.query("select * from match_board where author like ? ", new MatchBoardDTOMapper(), number);
	}

	@Override
	public List<DailyMatchCountDTO> readDailyMatchCount() {
		return jdbcTemplate.query("select date, count(*) as match_count from match_board group by date order by date",
				new DailyMatchCountDTOMapper());
	}

	@Override
	public int readNumberAppliable(int number) {
		return jdbcTemplate.queryForObject("select number_appliable from match_board where number = ?", Integer.class,
				number);
	}

	public final class DailyMatchCountDTOMapper implements RowMapper<DailyMatchCountDTO> {

		@Override
		public DailyMatchCountDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
			DailyMatchCountDTO dailyMatchCountDTO = new DailyMatchCountDTO();
			dailyMatchCountDTO.setDate(rs.getDate("date"));
			dailyMatchCountDTO.setMatchCount(rs.getInt("match_count"));

			return dailyMatchCountDTO;
		}
	}

}
