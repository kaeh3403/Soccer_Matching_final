package com.soccermatching.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.soccermatching.dto.ApplicantDTO;

@Repository
public class ApplicantDAOImpl implements ApplicantDAO {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public List<ApplicantDTO> read(int author) {
		return jdbcTemplate.query(
				"select match_board_number, id, name, m.gender as gender, cphone, email from match_apply ma, match_board mb, member m where ma.match_board_number = mb.number and member_number != author and ma.member_number = m.number and author = ? order by match_board_number;",
				new ApplicatnDTOMapper(), author);
	}

	public final class ApplicatnDTOMapper implements RowMapper<ApplicantDTO> {

		@Override
		public ApplicantDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
			ApplicantDTO applicantDTO = new ApplicantDTO();
			applicantDTO.setMatchBoardNumber(rs.getInt("match_board_number"));
			applicantDTO.setCphone(rs.getString("cphone"));
			applicantDTO.setEmail(rs.getString("email"));
			applicantDTO.setGender(rs.getString("m.gender"));
			applicantDTO.setId(rs.getString("id"));
			applicantDTO.setName(rs.getString("name"));

			return applicantDTO;
		}

	}

}
