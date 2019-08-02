var address = document.getElementById("address");
var placeName = document.getElementById("placeName");
var start_time = document.getElementById("start_time");
var start_time_minutes = document.getElementById("start_time_minutes");
var end_time= document.getElementById("end_time");
var end_time_minutes = document.getElementById("end_time_minutes");
var game_type = document.getElementById("game_type");
var gender = document.getElementById("gender");
var number_appliable = document.getElementById("number_appliable");
var detailInfo = document.getElementById("detailInfo");
var fixedDate = document.getElementById("fixedDate");

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
var o_date;
var o_x;
var o_y;
var markers = [];
// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();  

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var mapContainer = document.getElementById('map'); // 지도를 표시할 


(function(){
   number = window.sessionStorage.getItem("number");
   document.getElementById("number").value = number;
   
   if(window.sessionStorage.getItem("regOrApply") === "apply"){
	   document.getElementById("abort").style.display = "";
	   document.getElementById("edit").style.display = "none";
	   document.getElementById("cancel").style.display = "none";
	   document.getElementById("delete").style.display = "none";
   }
   
    var request = new XMLHttpRequest();
    request.open("GET", "/api/match-boards/"+ number, true);
    request.onreadystatechange = dataParsing;
    request.send(null);
    function dataParsing(){
        if(request.readyState == 4 && request.status == 200){
            json = JSON.parse(request.responseText);
            number = json.number;
            o_address = json.address;
            o_placeName = json.placeName;
            o_date = new Date(json.date).getFullYear() +"-"+( new Date(json.date).getMonth() + 1) + "-"+new Date(json.date).getDate();;
            o_start_time = json.startTime;
            o_start_time_minutes = json.startTimeMinutes;
            o_end_time = json.endTime;
            o_end_time_minutes = json.endTimeMinutes;
            o_game_type = json.gameType;
            o_gender = json.gender;
            o_number_appliable = json.numberAppliable;
            o_detailInfo = json.detailInfo;
            o_x = json.x;
            o_y = json.y;

            address.value = o_address;
            fixedDate.value = o_date;
            placeName.value = o_placeName;
            start_time.value = o_start_time;
            start_time_minutes.value = o_start_time_minutes;
            end_time.value = o_end_time;
            end_time_minutes.value = o_end_time_minutes;
            game_type.value = o_game_type;
            gender.value = o_gender;
            number_appliable.value = o_number_appliable;
            detailInfo.value = o_detailInfo;
            mapOnlyMarker(o_y, o_x);
        }
    }
})();

function editMode(){
   
   var date = document.getElementById("fixedDate");
   date.id = "date";
   
   var calendarLocation = "js/match-datepicker.js";
   var newScript = document.createElement('script');
   newScript.setAttribute('src', calendarLocation);
   document.body.insertBefore(newScript, document.body.lastChild);
   
   var edit = document.getElementById("edit");
   var submit = document.getElementById("submit");
   var cancel = document.getElementById("cancel");
   var mapSearch = document.getElementById("menu_wrap")
   
   edit.style.display = "none";
   submit.style.display = "";
   cancel.style.display = "";
   mapSearch.style.display = "";
   
   document.getElementById("x").value= o_x;
   document.getElementById("y").value= o_y;
   
   placeName.removeAttribute("readonly");
   start_time.removeAttribute("disabled");
   start_time_minutes.removeAttribute("disabled");
   end_time.removeAttribute("disabled");
   end_time_minutes.removeAttribute("disabled");
   game_type.removeAttribute("disabled");
   gender.removeAttribute("disabled");
   number_appliable.removeAttribute("disabled");
    detailInfo.removeAttribute("readonly");
    
    mapSearching();
}

function cancelMode(){
   var date = document.getElementById("date");
   date.id = "fixedDate";
   var scriptNodes = document.getElementsByTagName("script");
   scriptNodes.item(scriptNodes.length-1).remove();
   var edit = document.getElementById("edit");
   var submit = document.getElementById("submit");
   var cancel = document.getElementById("cancel");
   var mapSearch = document.getElementById("menu_wrap")
   
   edit.style.display = "";
   submit.style.display = "none";
   cancel.style.display = "none";
   mapSearch.style.display = "none";
   
    address.value = o_address;
    placeName.value = o_placeName;
    start_time.value = o_start_time;
    start_time_minutes.value = o_start_time_minutes;
    end_time.value = o_end_time;
    end_time_minutes.value = o_end_time_minutes;
    game_type.value = o_game_type;
    gender.value = o_gender;
    number_appliable.value = o_number_appliable;
    detailInfo.value = o_detailInfo;

   placeName.setAttribute("readonly","readonly");
   start_time.setAttribute("disabled","disabled");
   start_time_minutes.setAttribute("disabled","disabled");
   end_time.setAttribute("disabled","disabled");
   end_time_minutes.setAttribute("disabled","disabled");
   game_type.setAttribute("disabled","disabled");
   gender.setAttribute("disabled","disabled");
   number_appliable.setAttribute("disabled","disabled");
    detailInfo.setAttribute("readonly", "readonly");
    mapOnlyMarker(o_y, o_x);
}

function deleteMode(){
	var reg = confirm("정말로 삭제하시겠습니까?") 
	if(reg){
//		alert(reg);
		var deleteMatch = new XMLHttpRequest();
		deleteMatch.open("Delete", "/match-board/edit/"+number, true);
		deleteMatch.send();
		deleteMatch.onreadystatechange = function(){
			if(deleteMatch.readyState == deleteMatch.DONE && deleteMatch.status == 200){
				if(deleteMatch.responseText == 5){
					/*alert(reg);*/
					
					window.location.href = "/profile";
				}
				else{
					alert("네트워크 에러 발생");
				}
			}
		}
	} else{
		return false;
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

function mapSearching(){
   // 마커를 담을 배열입니다

    mapOption = {
           center: new kakao.maps.LatLng(o_y, o_x), // 지도의 중심좌표
           level: 3 // 지도의 확대 레벨
       };  

   // 지도를 생성합니다    
   map = new kakao.maps.Map(mapContainer, mapOption); 
}

//키워드 검색을 요청하는 함수입니다
function searchPlaces() {
   var keyword = document.getElementById('keyword').value;
   
   if(keyword === ""){   
   }else{
       // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
       ps.keywordSearch(keyword, placesSearchCB);      
   }
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);
            

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNodes(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
            
           kakao.maps.event.addListener(marker, 'click', function(){
               markerMove(marker,title);
            })
            
            itemEl.onclick = function(event){
               markerMove(marker, title, event);
           }
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}
// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}
// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNodes(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

 function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

function markerMove(marker, title, event){
   
   //마커의 위치정보 저장
   var clickedPosition = marker.getPosition();
   // 마커의 위도 경도 저장 객체 생성
   var clickedMarkerPosition = new kakao.maps.LatLng(clickedPosition.getLat(), clickedPosition.getLng());
   // 마커를 중심으로 지도 이동
   var newMapOption = {
         center: new kakao.maps.LatLng(clickedPosition.getLat(), clickedPosition.getLng()),
         level:3
   }
   //지도 생성
   map = new kakao.maps.Map(mapContainer, newMapOption);
   
   //마커 생성
   var i = 0;
   removeMarker();
   var clickedMarker = new kakao.maps.Marker();
   markers.push(clickedMarker);
   clickedMarker.setPosition(clickedMarkerPosition);
   clickedMarker.setMap(map);
   document.getElementById("y").value = clickedPosition.getLat();
   document.getElementById("x").value = clickedPosition.getLng();
   //상세주소 반환                                                                        
   searchDetailAddrFromCoords(clickedMarkerPosition, function(result, status) {
     if (status === kakao.maps.services.Status.OK) {
        document.getElementById("address").value = result[0].address.address_name;
     }
   });
}

function abortMode(){
	confirm("정말로 취소하시겠습니까?");
	var request = new XMLHttpRequest();
	request.open("DELETE", "/match-board/edit/cancel/" + number);
	request.send();
	request.onreadystatechange = function(){
		if(request.readyState == request.DONE && request.status == 200){
			if(request.responseText == 1){
				window.location.href="/profile";
			}
			else{
				alert("네트워크 에러 발생");
			}
		}
	}
}