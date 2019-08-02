package com.soccermatching.dto;

public class MatchApplyDTO {
	private int memberNumber;
	private int matchBoardNumber;
	private int appliedCount;

	public int getMemberNumber() {
		return memberNumber;
	}

	public void setMemberNumber(int memberNumber) {
		this.memberNumber = memberNumber;
	}

	public int getMatchBoardNumber() {
		return matchBoardNumber;
	}

	public void setMatchBoardNumber(int matchBoardNumber) {
		this.matchBoardNumber = matchBoardNumber;
	}
	
	public int getAppliedCount() {
		return appliedCount;
	}
	
	public void setAppliedCount(int appliedCount) {
		this.appliedCount = appliedCount;
	}

	@Override
	public String toString() {
		return "MatchApply [memberNumber=" + memberNumber + ", matchBoardNumber=" + matchBoardNumber + ", appliedCount" + appliedCount + "]";
	}

}
