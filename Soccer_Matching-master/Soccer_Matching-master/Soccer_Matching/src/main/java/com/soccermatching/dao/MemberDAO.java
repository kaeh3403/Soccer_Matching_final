package com.soccermatching.dao;

import java.util.Date;
import java.util.List;

import com.soccermatching.dto.MemberDTO;

public interface MemberDAO {

	public List<MemberDTO> readAll();

	public MemberDTO read(int number);
	
	public MemberDTO read(String id);

	public void create(MemberDTO memberDTO);

	public void update(String password, String name, String gender, String cphone, Date birthday, String email, int number);

	public void delete(int number);

}