var address = document.getElementById("address");
var start_time = document.getElementById("start_time");
var start_time_minutes = document.getElementById("start_time_minutes");
var end_time= document.getElementById("end_time");
var end_time_minutes = document.getElementById("end_time_minutes");
var game_type = document.getElementById("game_type");
var gender = document.getElementById("gender");
var number_appliable = document.getElementById("number_appliable");
var detailInfo = document.getElementById("detailInfo");
var placeName = document.getElementById("placeName");
var date = document.getElementById("date");

var json;
var number;
var map;
var o_address;
var o_placeName;
var o_start_time;
var o_start_time_minutes;
var o_end_time;
var o_end_time_minutes;
var o_game_type;
var o_gender;
var o_number_appliable;
var o_detailInfo;
var o_x;
var o_y;
var markers = [];
// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();  

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var mapContainer = document.getElementById('map'); // 지도를 표시할 


(function(){
   
   start_time = document.getElementById("start_time");
    var html = "<option value='' selected disabled>00시</option>";
    for (var i = 0; i <= 24; i++) {
      if (i < 10) {
        html += "<option value=" + i + ">" + "0" + i + "시" + "</option>"
      } else {
        html += "<option value=" + i + ">" + i + "시" + "</option>"
      }
    }
    start_time.innerHTML = html;

    end_time = document.getElementById("end_time");
    var endHtml = "<option value='' selected disabled>00시</option>";
    for (var i = 0; i <= 24; i++) {
      if (i < 10) {
        endHtml += "<option value=" + i + ">" + "0" + i + "시" + "</option>"
      } else {
        endHtml += "<option value=" + i + ">" + i + "시" + "</option>"
      }
    }
    
    end_time.innerHTML = endHtml;
    
    
   number = window.sessionStorage.getItem("number"); 
    var request = new XMLHttpRequest();
    request.open("GET", "/api/match-boards/"+ number, true);
    request.onreadystatechange = dataParsing;
    request.send(null);
    function dataParsing(){
        if(request.readyState == 4 && request.status == 200){
            json = JSON.parse(request.responseText);
            if(json.currentAppliable == 0){
            	alert("해당 경기는 마감되었습니다.");
            	document.getElementById("edit").remove();
            	document.getElementById("back").style.margin = "0 auto"; 
            }
            number = json.number;
            o_address = json.address;
            o_placeName = json.placeName;
            o_start_time = json.startTime;
            o_start_time_minutes = json.startTimeMinutes;
            o_end_time = json.endTime;
            o_end_time_minutes = json.endTimeMinutes;
            o_game_type = json.gameType;
            o_gender = json.gender;
            o_number_appliable = json.numberAppliable;
            o_detailInfo = json.detailInfo;
            o_date = new Date(json.date).getFullYear() +"-"+( new Date(json.date).getMonth() + 1) + "-"+new Date(json.date).getDate();
            o_x = json.x;
            o_y = json.y;

            address.value = o_address;
            start_time.value = o_start_time;
            placeName.value = o_placeName;
            start_time_minutes.value = o_start_time_minutes;
            end_time.value = o_end_time;
            end_time_minutes.value = o_end_time_minutes;
            game_type.value = o_game_type;
            gender.value = o_gender;
            number_appliable.value = o_number_appliable;
            detailInfo.value = o_detailInfo;
            date.value=o_date;
            mapOnlyMarker(o_y, o_x);
        }
    }
})();

function applyMatch(){
   var request = new XMLHttpRequest();
    request.open("POST", "/match-board/"+number, true);
    request.onreadystatechange = checkInfo;
    request.send(null);
    
    function checkInfo(){
       if(request.readyState == request.DONE && request.status == 200){
         if(request.responseText == 0){
        	 alert("로그인 해주세요");
        	 window.location.href = "/main";
         } else if (request.responseText == 0)
    	   alert("성공적으로 등록되었습니다.");
         	window.location.href = "/main";
       }
    }
}

function mapOnlyMarker(o_y, o_x){
    // 마커를 담을 배열입니다
    mapOption = {
        center: new kakao.maps.LatLng(o_y, o_x), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };      
    // 지도를 생성합니다    
    map = new kakao.maps.Map(mapContainer, mapOption); 
    var markerPosition  = new kakao.maps.LatLng(o_y, o_x); 
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
}