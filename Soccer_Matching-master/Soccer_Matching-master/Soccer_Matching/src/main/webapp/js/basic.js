var date = new Date();
var dateText = date.toDateString();
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
document.getElementById("month1").innerHTML = koMonth(dateText.substring(4, 7));
document.getElementById("day1").innerHTML = dateText.substring(8, 10);
document.getElementById("dayOfWeek1").innerHTML = getDay(dateText.substring(0, 3));

for (var i = 2; i <= 7; i++) {
    var tmpDate = date.setDate(date.getDate() + 1);
    var newDate = new Date(tmpDate);
    dateText = newDate.toDateString();
    document.getElementById("month" + i).innerHTML = koMonth(dateText.substring(4, 7));
    document.getElementById("day" + i).innerHTML = dateText.substring(8, 10);
    document.getElementById("dayOfWeek" + i).innerHTML = getDay(dateText.substring(0, 3));
    getColor(i, getDay(dateText.substring(0, 3)));
}

//토요일과 일요일 날짜 색깔 변경
function getColor(i, day) {
    if (day === "토") {
        document.getElementById("dayOfWeek" + i).style.color = "blue";
    } else if (day === "일") {
        document.getElementById("dayOfWeek" + i).style.color = "Red";
    } else {
        document.getElementById("dayOfWeek" + i).style.color = "black";
    }
}

//요일 한글화
function getDay(day) {
    switch (day) {
        case 'Sun':
            return '일';
        case 'Mon':
            return '월';
        case 'Tue':
            return '화';
        case 'Wed':
            return '수';
        case 'Thu':
            return '목';
        case 'Fri':
            return '금';
        case 'Sat':
            return '토';
    }
}

//월 한글화
function koMonth(month) {
    switch (month) {
        case 'Jan':
            return '01';
        case 'Feb':
            return '02';
        case 'Mar':
            return '03';
        case 'Apr':
            return '04';
        case 'May':
            return '05';
        case 'Jun':
            return '06';
        case 'Jul':
            return '07';
        case 'Aug':
            return '08';
        case 'Sep':
            return '09';
        case 'Oct':
            return '10';
        case 'Nov':
            return '11';
        case 'Dec':
            return '12';
    }
}