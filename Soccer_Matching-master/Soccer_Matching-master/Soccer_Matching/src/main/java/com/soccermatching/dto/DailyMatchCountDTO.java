package com.soccermatching.dto;

import java.sql.Date;

public class DailyMatchCountDTO {
	private Date date;
	private int matchCount;

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getMatchCount() {
		return matchCount;
	}

	public void setMatchCount(int matchCount) {
		this.matchCount = matchCount;
	}

	@Override
	public String toString() {
		return "DailyMatchCountDTO [date=" + date + ", matchCount=" + matchCount + "]";
	}

}
