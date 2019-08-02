package com.soccermatching.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soccermatching.dao.MemberDAO;
import com.soccermatching.dto.MemberDTO;

@RestController
@RequestMapping("/api/members")
public class MemberController {

	@Autowired
	private MemberDAO memberDAO;

	@GetMapping
	public List<MemberDTO> getAll() {
		return memberDAO.readAll();
	}

	@GetMapping("/{number}")
	public MemberDTO getOne(@PathVariable("number") int number) {
		return memberDAO.read(number);
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<?> getOne(@PathVariable("id") String id) {
		MemberDTO memberDTO = memberDAO.read(id);

		if (memberDTO == null) {
			return new ResponseEntity<>(0, HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(1, HttpStatus.OK);
	}
	
	@PutMapping("/{number}")
	public void modify(@PathVariable("number") int number, @RequestBody Map<String, Object> map) {
		String password = (String) map.get("password");
		String name = (String) map.get("name");
		String gender = (String) map.get("gender");
		String cphone = (String) map.get("cphone");
		Date birthday = (Date) map.get("birthday");
		String email = (String) map.get("email");
		
		memberDAO.update(password, name, gender, cphone, birthday, email, number);
	}
	
	@DeleteMapping("/{number}")
	public void remove(@PathVariable("number") int number) {
		memberDAO.delete(number);
	}

}