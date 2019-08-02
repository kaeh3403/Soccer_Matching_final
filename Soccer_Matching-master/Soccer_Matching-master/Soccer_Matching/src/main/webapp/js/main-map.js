var lat= "";
var lng = "";
var data = "";
var matches = "";
var map = "";
var clusterer;

var swLat;
var swLng;
var neLat;
var neLng;
var posData = new Array();
var clickedDay = new Date().getDate();


var mapContainer = document.getElementById('map'); // 지도를 표시할 div


navigator.geolocation.getCurrentPosition(success, error);

function success(pos){
   lat = pos.coords.latitude;
    lng = pos.coords.longitude;
    loadMap(lat,lng);
}

function error(){
   lat = 37.566826;
   lng = 126.9786567;
   loadMap(lat,lng);
}
   

function loadMap(lat,lng){
   var mapOption = {
            center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
            level: 8 // 지도의 확대 레벨
    };
   
   //지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
   map = new kakao.maps.Map(mapContainer, mapOption);
   getNELatLng();
   getSWLatLng();
   clustering();
   removeList();
   getList();
   kakao.maps.event.addListener(map, 'bounds_changed', function() {
      getNELatLng();
      getSWLatLng();
      removeList();
      getList();
   });
   
   
}

function clustering(){
   
   
   clusterer = new kakao.maps.MarkerClusterer({
         map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
         averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
         minLevel: 11, // 클러스터 할 최소 지도 레벨
         disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
   });
   
   var request = new XMLHttpRequest();
   request.open("GET", "api/match-boards", false);
   request.onreadystatechange = dataSaving;
   request.send(null);
   
   function dataSaving(){
      if(request.readyState == request.DONE && request.status == 200){
         data = request.responseText;
         matches = JSON.parse(data);
         for (var i= 0; i< matches.length; i++){
            if(matches[i].date > new Date().getTime()){
               var tempObj = new Object();
                tempObj.lat = matches[i].y;
                tempObj.lng = matches[i].x;
                tempObj.number = matches[i].number;
                tempObj.numberApplied = matches[i].numberApplied;
                posData.push(tempObj);   
            }
         };
         var markers = posData.map(function(position, i){
              return new kakao.maps.Marker({
                  position : new kakao.maps.LatLng(position.lat, position.lng)
              });
          });
         
         clusterer.addMarkers(markers);
      }
   }
      
   // 마커 클러스터러에 클릭이벤트를 등록합니다
    // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
    // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
    kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
        // 현재 지도 레벨에서 1레벨 확대한 레벨
        var level = map.getLevel()-1;
        // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
        map.setLevel(level, {anchor: cluster.getCenter()});
    });
}

function getSWLatLng() {
    // 영역의 남서쪽 좌표를 얻어옵니다 
    var swLatLng = map.getBounds().getSouthWest(); 
    swLat = swLatLng.Ga;
    swLng = swLatLng.Ha;
}

function getNELatLng(){
    // 영역의 북동쪽 좌표를 얻어옵니다
   var neLatLng = map.getBounds().getNorthEast();
   neLat = neLatLng.Ga;
    neLng = neLatLng.Ha;
}

function getList(){
   var list = matches.map(function(match, i){
      if(swLat < Number(match.x) && neLat > Number(match.x) && swLng < Number(match.y) && neLng > Number(match.y) && Number(clickedDay) == new Date(new Date(match.date)).getDate()){
    	   
    	  var newDiv = document.createElement("div");
          newDiv.setAttribute("class","contents");
          newDiv.setAttribute("onclick","detailShow(this)");
    	  var appliable;
          if(match.currentAppliable >0){
             appliable = "신청가능";
             btn = " btn-success";
          }else{
             appliable = "마감";
             btn = " btn-primary";
          }
          newDiv.innerHTML =
             "<div class='matchTime' style='font-size: 25px;'id='time'>" + match.startTime+ ":"+ getTwoDigit(match.startTimeMinutes)+"</div>" + 
             "<div class='matchContent'>"+
                "<p class='matchTitle' style='font-size:22px;margin-bottom:0px;'id='placeName'>" + match.placeName + "</p>" +
                "<p class='matchOther'>" + 
                   "<span id='match_gender'>" + match.gender + "</span>" + 
                   "<span style='display:none' id='match_number'>"+ match.number +"</span>"+
                "</p>"+
             "</div>"+
             "<div class='btnApply'>" +
                "<button class='btn"+btn+"'>"+ appliable+"</button>" +
             "</div>"+
             "<div class='empty'>"+
             "</div>";
         document.getElementById("sidebar").appendChild(newDiv);
      }
   })
}

function removeList(){
   
   var remove = document.getElementsByClassName("contents");
   for(var i=0; i < remove.length; i++){
      remove[i].parentNode.removeChild(remove[i]);
   }
   for(var i=0; i < remove.length; i++){
	      remove[i].parentNode.removeChild(remove[i]);
	   }
}

function detailShow(target){
   var number = target.children[1].lastChild.lastChild.textContent;
   window.sessionStorage.setItem("number",number)
   window.location.href = "/match-board/" + number;
}

function getTwoDigit(min){
   if(min < 10){
      return '0' + min;
   } else{
      return min
   }
}

function changeDate(el){
   clickedDay = el.childNodes[1].childNodes[2].textContent;
   for(var i=0;i<el.parentNode.children.length; i++){
      el.parentNode.children[i].style.background = "white";
   }
   el.style.background = "#cccccc";
   removeList();
   getList();
}