package com.soccermatching.dto;

public class ApplicantDTO {
	private int matchBoardNumber;
	private String id;
	private String name;
	private String gender;
	private String cphone;
	private String email;

	public int getMatchBoardNumber() {
		return matchBoardNumber;
	}

	public void setMatchBoardNumber(int matchBoardNumber) {
		this.matchBoardNumber = matchBoardNumber;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getCphone() {
		return cphone;
	}

	public void setCphone(String cphone) {
		this.cphone = cphone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "ApplicantDTO [matchBoardNumber=" + matchBoardNumber + ", id=" + id + ", name=" + name + ", gender="
				+ gender + ", cphone=" + cphone + ", email=" + email + "]";
	}

}
