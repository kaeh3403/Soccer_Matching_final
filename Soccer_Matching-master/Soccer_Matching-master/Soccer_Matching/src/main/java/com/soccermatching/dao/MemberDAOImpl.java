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

import com.soccermatching.dto.MemberDTO;

@Repository
public class MemberDAOImpl implements MemberDAO {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public List<MemberDTO> readAll() {
		return jdbcTemplate.query("select * from member", new MemberDTOMapper());
	}

	@Override
	public MemberDTO read(int number) {
		try {
			return jdbcTemplate.queryForObject("select * from member where number = ?", new MemberDTOMapper(), number);
		} catch (EmptyResultDataAccessException e) {
			return null;
		}

	}

	@Override
	public MemberDTO read(String id) {
		try {
			return jdbcTemplate.queryForObject("select * from member where id like ?", new MemberDTOMapper(), id);
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}

	@Override
	public void create(MemberDTO memberDTO) {
		jdbcTemplate.update(
				"insert into member (id, password, name, gender, cphone, birthday, email) values (?, ?, ?, ?, ?, ?, ?)",
				memberDTO.getId(), memberDTO.getPassword(), memberDTO.getName(), memberDTO.getGender(),
				memberDTO.getCphone(), memberDTO.getBirthday(), memberDTO.getEmail());
	}

	@Override
	public void update(String password, String name, String gender, String cphone, Date birthday, String email,
			int number) {
		jdbcTemplate.update(
				"update member set password = ?, name = ?, gender = ?, cphone = ?, birthday = ?, email = ? where number = ?",
				password, name, gender, cphone, birthday, email, number);

	}

	@Override
	public void delete(int number) {
		jdbcTemplate.update("delete from member where number = ?", number);
	}

	public final class MemberDTOMapper implements RowMapper<MemberDTO> {
		public MemberDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
			MemberDTO memberDTO = new MemberDTO();
			memberDTO.setBirthday(rs.getString("birthday"));
			memberDTO.setCphone(rs.getString("cphone"));
			memberDTO.setEmail(rs.getString("email"));
			memberDTO.setEnabled(rs.getInt("enabled"));
			memberDTO.setGender(rs.getString("gender"));
			memberDTO.setId(rs.getString("id"));
			memberDTO.setName(rs.getString("name"));
			memberDTO.setNumber(rs.getInt("number"));
			memberDTO.setPassword(rs.getString("password"));
			memberDTO.setRole(rs.getString("role"));

			return memberDTO;
		}
	}

}