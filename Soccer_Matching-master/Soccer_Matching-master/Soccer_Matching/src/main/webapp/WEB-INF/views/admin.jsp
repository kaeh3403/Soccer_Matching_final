<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>관리자 페이지</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<script src="//code.jquery.com/jquery-3.3.1.min.js"></script>

<script>
	$(document).ready(function() {
		$('.memberCheck_All').click(function() {
			if ($('.memberCheck_All').prop('checked')) {
				$('.memberChk').prop('checked', true);
			} else {
				$('.memberChk').prop('checked', false);
			}
		});
		$('.matchCheck_All').click(function() {
			if ($('.matchCheck_All').prop('checked')) {
				$('.matchChk').prop('checked', true);
			} else {
				$('.matchChk').prop('checked', false);
			}
		});
		$('.memberChk').click(function() {
			$('.memberCheck_All').prop('checked', false);
		});
		$('.matchChk').click(function() {
			$('.matchCheck_All').prop('checked', false);
		});
	});
</script>

<script>
	var $mType = $('#mType');
	var $mWord = $('#mWord');
	$("#mSearch").click(function() {
		var mbType = $mType.val();
		var mbWord = $mWord.val();
		
		$.ajax({
			url : "api/members/",
			type : "GET",
			success : function() {
				location.reload();
			}
		});
	});
	
	var $mbType = $('#mbType');
	var $mbWord = $('#mbWord');
	$("#mbSearch").click(function() {
		var mbType = $mbType.val();
		var mbWord = $mbWord.val();
	
		$.ajax({
			url : "api/match-boards/",
			type : "GET",
			success : function() {
				location.reload();
			}
		});
	});
</script>


</head>
<body>



	<div class="container">
		<h2>회원 관리</h2>
		<div class="panel panel-default">
			<div class="panel-heading">회원 명단</div>
			<div class="panel-body">
				<form method="GET" class="form-inline">
					<div class="form-group">
						<select class="form-control" name="mType" id="mType">
							<option value="">전체</option>
							<option value="name">이름</option>
							<option value="id">아이디</option>
							<option value="phone">전화번호</option>
							<option value="email">이메일</option>
						</select>
					</div>
					<div class="form-group">
						<input type="text" class="form-control" id="mWord" name="mWord">
						<button class="btn btn-primary" id="mSearch" name="mSearch">검색</button>
					</div>
				</form>


				<table class="table table-striped">
					<thead>
						<tr>
							<td><input type="checkbox" name="memberAll"
								class="memberCheck_All" /></td>
							<th>이름</th>
							<th>아이디</th>
							<th>전화번호</th>
							<th>이메일</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="m" items="${memberDTOList}">
							<tr>
								<td><input type="checkbox" class="memberChk"
									name="mRowCheck" value="${m.number}" /></td>
								<td>${m.name}</td>
								<td>${m.id}</td>
								<td>${m.cphone}</td>
								<td>${m.email}</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
				<button class="deleteBtn">삭제</button>
				<script>
					$(".deleteBtn").click(function() {
						var confirm_val = confirm("정말 삭제하시겠습니까?");
						if (confirm_val) {
							var valueArr = new Array();
							var list = $("input[name='mRowCheck']");
							for (var i = 0; i < list.length; i++) {
								if (list[i].checked) {
									valueArr.push(list[i].value);
								}
							}
							for ( var i in valueArr) {
								$.ajax({
									url : "api/members/" + valueArr[i],
									type : "DELETE",
									success : function() {
										location.reload();
									}
								});
							}
						}
					});
				</script>

			</div>
		</div>
	</div>

	<div class="container">
		<h2>매치 관리</h2>
		<div class="panel panel-default">
			<div class="panel-heading">등록 경기</div>
			<div class="panel-body">
				<form method="GET" class="form-inline">
					<div class="form-group">
						<select class="form-control" name="mbType" id="mbType">
							<option value="">전체</option>
							<option value="gameDate">날짜</option>
							<option value="startTime">경기시간</option>
							<option value="gameType">경기종류</option>
							<option value="gender">성별</option>
							<option value="placeName">경기장</option>
							<option value="address">위치</option>
							<option value="registerDate">등록일</option>
						</select>
					</div>
					<div class="form-group">
						<input type="text" class="form-control" id="mbWord" name="mbWord">
						<button class="btn btn-primary" id="mbSearch" name="mbSearch">검색</button>
					</div>
				</form>

				<table class="table table-striped">
					<thead>
						<tr>
							<td><input type="checkbox" name="matchAll"
								class="matchCheck_All" /></td>
							<th>날짜</th>
							<th>경기시간</th>
							<th>경기종류</th>
							<th>성별</th>
							<th>경기장</th>
							<th>위치</th>
							<th>등록일</th>

						</tr>
					</thead>

					<tbody>
						<c:forEach var="mb" items="${matchDTOList}">
							<tr>
								<td><input type="checkbox" class="matchChk"
									name="mbRowCheck" value="${mb.number}" /></td>
								<td>${mb.date}</td>
								<td>${mb.startTime}:${mb.startTimeMinutes}~
									${mb.endTime}:${mb.endTimeMinutes}</td>
								<td>${mb.gameType}</td>
								<td>${mb.gender}</td>
								<td>${mb.address}</td>
								<td>${mb.placeName}</td>
								<td>${mb.registerDate}</td>

							</tr>
						</c:forEach>
					</tbody>
				</table>
				<button class="deleteBtn1">삭제</button>
				<script>
					$(".deleteBtn1").click(function() {
						var confirm_val = confirm("정말 삭제하시겠습니까?");
						if (confirm_val) {
							var valueArr = new Array();
							var list = $("input[name='mbRowCheck']");
							for (var i = 0; i < list.length; i++) {
								if (list[i].checked) {
									valueArr.push(list[i].value);
								}
							}
							for ( var i in valueArr) {
								$.ajax({
									url : "api/match-boards/" + valueArr[i],
									type : "DELETE",
									success : function() {
										location.reload();
									}
								});
							}
						}
					});
				</script>
			</div>
		</div>
	</div>
</body>
</html>