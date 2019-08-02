﻿<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>티키타카</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <!-- 기본 css-->
    <link rel="stylesheet" href="css/soccer-style.css">
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Black+Han+Sans|Jua&display=swap" rel="stylesheet">

    <!-- services 라이브러리 불러오기 -->
    <!-- services와 clusterer, drawing 라이브러리 불러오기 -->
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6b187315c60d45782c7546f0eaf4d3bc&libraries=services,clusterer,drawing"></script>
</head>

<body>
    <div id="wrapper">
        <!--헤더부분-->
        <header>
            <div id="firstHeader">
                <img id="logo" class="rounded" src="https://data.ac-illust.com/data/thumbnails/84/84b08f04d5b50958441953bec5aa531d_w.jpeg" />
                <div id="title">
                    티키타카
                </div>
            </div>
            
            <sec:authorize access="isAuthenticated()">
            <div id="addMatch"><button type="button" class="btn btn-primary active" onclick="window.location.href='match-register'" style="font-size:1.5rem; width:200px;">매치 등록하기</button></div>
            </sec:authorize>
            
            <nav id="secondHeader">
                <ul id="navHeader">
                    <sec:authorize access="isAnonymous()">
                    <li>
                        <a href="main.html" data-toggle="modal" data-target="#matchModal" style="color:black">로그인</a>
                    </li>
                    
                    <li>
                        <a href="register" style="color:black">회원가입</a>
                    </li>
                    </sec:authorize>
                    
                    <sec:authorize access="isAuthenticated()">
                    
                    <li>
                        <a href="/profile" style="color:black"><sec:authentication property="principal.username"/></a>
                    </li>
                    
                    <li>
                        <a href="/logout" style="color:black">로그아웃</a>
                    </li>
                    </sec:authorize>
                    
                    <sec:authorize access="hasRole('ADMIN')">
                    <li>
                        <a href="/admin" style="color:black">관리자 페이지로 이동</a>
                    </li>
                    </sec:authorize>
                </ul>
            </nav>
        </header>

        <!-- 로그인 Modal -->
        
        <!-- The Modal --><div class="modal fade" id="matchModal">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">로그인</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <form method="post">
                            <div class="form-group">
                                <label for="email">ID</label>
                                <input type="text" class="form-control" name="id" id="email">
                            </div>
                            <div class="form-group">
                                <label for="pwd">비밀번호</label>
                                <input type="password" class="form-control" name="password" id="pwd">
                            </div>
                            <br/>
                            <button type="submit" class="btn btn-primary" style="position:relative;left:35%;background-color:rgb(89, 196, 103);">로그인</button><br/><br/>
                            <a href="register" style="color:black;position:relative;margin-left:auto;margin-right:auto;">회원이 아니신가요?</a>
                        </form>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>


        <!--Map 부분-->
        <section>
            <div id="map" style="width:65%;height:84vh;"></div>
            <div id="sidebar">
                <div id="tab">
                    <ul>
                        <li onclick="changeDate(this)">
                            <p class="p_date"><span id="month1"></span>.<span id="day1"></span></p>
                            <p id="dayOfWeek1" class="day"></p>
                        </li>
                        <li onclick="changeDate(this)">
                            <p class="p_date"><span id="month2"></span>.<span id="day2"></span></p>
                            <p id="dayOfWeek2" class="day"></p>
                        </li>
                        <li onclick="changeDate(this)">
                            <p class="p_date"><span id="month3"></span>.<span id="day3"></span></p>
                            <p id="dayOfWeek3" class="day"></p>
                        </li>
                        <li onclick="changeDate(this)">
                            <p class="p_date"><span id="month4"></span>.<span id="day4"></span></p>
                            <p id="dayOfWeek4" class="day"></p>
                        </li>
                        <li onclick="changeDate(this)">
                            <p class="p_date"><span id="month5"></span>.<span id="day5"></span></p>
                            <p id="dayOfWeek5" class="day"></p>
                        </li>
                        <li onclick="changeDate(this)">
                            <p class="p_date"><span id="month6"></span>.<span id="day6"></span></p>
                            <p id="dayOfWeek6" class="day"></p>
                        </li>
                        <li onclick="changeDate(this)">
                            <p class="p_date"><span id="month7"></span>.<span id="day7"></span></p>
                            <p id="dayOfWeek7" class="day"></p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <footer>조원 : 임홍휘, 김성규, 박상준, 김현민, 이원희</footer>
    </div>
   
    
    <script type="text/javascript" src="js/main-map.js"></script>
    <script type="text/javascript" src="js/basic.js"></script>
    
    <script type="text/javascript">
	var result = '${msg}';
	
	if (result == 'registerSuccess') {
		alert("등록했습니다.");
	}
	
	if (result == 'applySuccess') {
		alert("지원했습니다.");
	}
	
</script>
    
</body>

</html>