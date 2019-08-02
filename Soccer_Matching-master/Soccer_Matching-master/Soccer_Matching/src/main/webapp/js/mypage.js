var memberNum;
var data;
var parsedData;
var calData;
var calendar;
var number;

document.addEventListener('DOMContentLoaded', function() {

   var request = new XMLHttpRequest();
   request.open("GET", "/profile", true);
   request.onreadystatechange = getData;
   request.send();

   function getData(){
         if(request.readyState == request.HEADERS_RECEIVED){
            memberNum = request.getResponseHeader("Member-Number");
        var dataRead = new XMLHttpRequest();
        dataRead.open("GET", "/profile/info",true);
        dataRead.onreadystatechange = getContents;
        dataRead.send();
        function getContents(){
           if(dataRead.readyState == 4 && dataRead.status==200){
              data = dataRead.responseText;
              parsedData = JSON.parse(data);
              document.getElementById("id").textContent = parsedData[0].name;
              calData = new Array();
              calData = getEvents(parsedData);
              getCalendar(calData);
           }
            }
         }
      }
})

function getCalendar(calData){
   var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid', 'list', 'bootstrap', 'interaction', ],
        locale: 'ko', //언어설정
        height: '700', // 전체 테이블 높이 설정
        aspectRatio: 1.46, //가로 세로 비율 가로/세로
        eventTextColor: '#ffffff', //이벤트 글자 색
        eventTimeFormat: { // 이벤트 날짜 포캣
            hour: 'numeric',
            meridiem: '2-digit'
        },
        events: calData,
        views:{
           list:{
              duration: { days: 30}
           }
        },
        displayEventTime: true, //이벤트의 시간 표시 여부
        header: {
            left: 'prev,,next today',
            center: 'title',
            right: 'dayGridMonth, listWeek'
        },
        buttonText: {
            today: '오늘',
            dayGridMonth: '월간',
            listWeek: '리스트',
            day: ""
        },
        eventClick: function(info) {
            modalClicking(info);
        },
        noEventsMessage: "등록 또는 신청한 경기가 없습니다.",
        columnHeaderHtml: function(date) {
            switch (date.getDay()) {
                case 0:
                    return '<span style="color:red">일</span>';
                case 1:
                    return '<span>월</span>'
                case 2:
                    return '<span>화</span>'
                case 3:
                    return '<span>수</span>'
                case 4:
                    return '<span>목</span>'
                case 5:
                    return '<span>금</span>'
                case 6:
                    return '<span style="color:blue">토</span>'
            }
        }
    });
    
    calendar.render();
    
    ilkilling();
}

document.addEventListener('DOMSubtreeModified', function() {
    var ilremover = document.getElementsByClassName("fc-day-number");
    for (var i = 0; i < ilremover.length; i++) {
        ilremover[i].textContent = ilremover[i].textContent.replace("일", "");
    }

});

function ilkilling() {
    var ilremover = document.getElementsByClassName("fc-day-number");
    for (var i = 0; i < ilremover.length; i++) {
        ilremover[i].textContent = ilremover[i].textContent.replace("일", "");
    }
}

function modalClicking(info) {
    info.el.setAttribute("data-toggle", "modal");
    info.el.setAttribute("data-target", "#myModal");
    modalHeader(info);
}

function modalHeader(info) {
    document.getElementsByClassName("modal-title")[0].textContent = new Date(info.event.start).getFullYear() + "년 " + (new Date(info.event.start).getMonth() + 1) + '월 ' + new Date(info.event.start).getDate() + '일'; 
    modalBody(info);
}

function modalBody(info) {
    var container = document.getElementsByClassName("modal-body")[0];
    var contentsDiv = document.createElement("div"); // 한 경기 전체 컨테이너
    contentsDiv.setAttribute("class", "contentsDiv");
    contentsDiv.setAttribute("onclick", "loadMatch(this)");
    var regOrApply = document.createElement("div"); // 등록경기인지 지원 경기인지
    if(info.event.backgroundColor === "blue"){
       regOrApply.textContent = "지원한 경기";
        regOrApply.setAttribute("class", "regOrApply");
        regOrApply.style.color = "blue";
    } else if(info.event.backgroundColor === "red"){
       regOrApply.textContent = "등록한 경기";
        regOrApply.setAttribute("class", "regOrApply");
        regOrApply.style.color = "red";
    }
    contentsDiv.appendChild(regOrApply);
    var timeDiv = document.createElement("div"); // timeDiv = 시간 Container
    timeDiv.setAttribute("class", "timeDiv");
    timeDiv.innerHTML =
        '<span>' + new Date(info.event.start).getHours() + '</span>' +
        '<span>:</span>' +
        '<span>' + getTwoDigitMinutes(new Date(info.event.start).getMinutes()) + '</span>';
    var contentDiv = document.createElement("div"); // contentDiv =컨텐츠 container
    contentDiv.setAttribute("class", "contentDiv");
    var firstHeader = document.createElement("p");
    firstHeader.setAttribute("class", "firstHeader"); // firstHeader = 컨텐츠의 제목
    firstHeader.textContent = info.event.title;
    var gender = info.event.extendedProps.gender;
    var secondHeader = document.createElement("p"); // SecondHeader = 성별 정보 
    secondHeader.setAttribute("class", "secondHeader");
    secondHeader.innerHTML = gender; 
    
    contentDiv.appendChild(firstHeader);
    contentDiv.appendChild(secondHeader);
    contentsDiv.appendChild(timeDiv);
    contentsDiv.appendChild(contentDiv);
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    container.appendChild(contentsDiv);
    var numberNode = document.createElement("span");
    number = info.event.id;
    numberNode.innerHTML = number;
    numberNode.style.display = "none";
    contentDiv.appendChild(numberNode);
    if (info.event.extendedProps.applicants != null){
       var applicants = document.createElement("div");
        applicants.setAttribute("class", "lists");
       var appList = info.event.extendedProps.applicants;
        var appListHtml = "";
        for (var i=0; i < appList.length; i++){
           appListHtml += "<tr>" +
                       "<td>" + appList[i].id + "</td>" +
                       "<td>" + appList[i].name + "</td>" +
                       "<td>" + appList[i].gender + "</td>" +
                       "<td>" + appList[i].cphone + "</td>" +
                       "<td>" + appList[i].email + "</td>"+
                       "</tr>"
        }
        
        var listHtml = "<table class='table'>" +
                    "<caption class='caption'>지원자 정보</caption>" +
                    "<tr>" + 
                    "<th>아이디</th>" + "<th>이름</th>" + "<th>성별</th>" + "<th>전화번호</th>" + "<th>이메일</th>" +
                    "</tr>"+
                    appListHtml +
                    "</table>"
        applicants.innerHTML = listHtml;
        container.appendChild(applicants);
    }
    
}

function getTwoDigitMinutes(minutes) {
    if (minutes < 10) {
        return '0' + minutes;
    } else {
        return minutes;
    }
}

function loadMatch(target) {
	var number = target.lastChild.lastChild.textContent;
	console.log(target);
	if(target.children[0].textContent == "등록한 경기"){
		window.sessionStorage.setItem("regOrApply", "reg")
	}
	if(target.children[0].textContent == "지원한 경기"){
		window.sessionStorage.setItem("regOrApply", "apply")
	} 
   window.sessionStorage.setItem("number", number);
    window.location.href = "/match-board/edit";
}

function getEvents(dataSet){
   var apply = new Array();
   var register = new Array();
   apply = dataSet[1].apply;
   register = dataSet[1].register;
   var eventsArray = new Array();
   for (var i=0; i < apply.length; i++){
      var applyObj = new Object();
      applyObj.id = apply[i].number;
      applyObj.title = apply[i].placeName;
      applyObj.start = new Date(apply[i].date).getFullYear() + "-" +getTwoDigit((new Date(apply[i].date).getMonth() + 1)) + "-" + getTwoDigit(new Date(apply[i].date).getDate()) + " " + apply[i].startTime + ":" + getTwoDigit(apply[i].startTimeMinutes);
      applyObj.end = new Date(apply[i].date).getFullYear() + "-" +getTwoDigit((new Date(apply[i].date).getMonth() + 1)) + "-" + getTwoDigit(new Date(apply[i].date).getDate()) + " " + apply[i].endTime + ":" + getTwoDigit(apply[i].endTimeMinutes);
      applyObj.gender = apply[i].gender;
      applyObj.color = "blue";
      eventsArray.push(applyObj);
   }
   for (var i=0; i < register.length; i++){
      var registerObj = new Object();
      registerObj.id = register[i].number;
      registerObj.title = register[i].placeName;
      registerObj.start = new Date(register[i].date).getFullYear() + "-" +getTwoDigit((new Date(register[i].date).getMonth() + 1)) + "-" + getTwoDigit(new Date(register[i].date).getDate()) + " " + register[i].startTime + ":" + getTwoDigit(register[i].startTimeMinutes);
      registerObj.end = new Date(register[i].date).getFullYear() + "-" +getTwoDigit((new Date(register[i].date).getMonth() + 1)) + "-" + getTwoDigit(new Date(register[i].date).getDate()) + " " + register[i].endTime + ":" + getTwoDigit(register[i].endTimeMinutes);
      registerObj.color = "red";
      registerObj.applicants = register[i].applicants;
      registerObj.gender = register[i].gender;
      eventsArray.push(registerObj);
   }
   return eventsArray;
}

function getTwoDigit(data){
   if(data < 10){
      return '0' + data
   }else{
      return data;
   }
}