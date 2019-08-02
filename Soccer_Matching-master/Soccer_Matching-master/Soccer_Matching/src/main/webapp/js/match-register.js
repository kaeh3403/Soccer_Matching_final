var address = document.getElementById("address");
var placeName = document.getElementById("placeName");
var date = document.getElementById("date");
var start_time = document.getElementById("start_time");
var start_time_minutes = document.getElementById("start_time_minutes");
var end_time = document.getElementById("end_time");
var end_time_minutes = document.getElementById("end_time_minutes");
var game_type = document.getElementById("game_type");
var gender = document.getElementById("gender");
var number_appliable = document.getElementById("number_appliable");

(function() {
  'use strict ';                                                                        
  window.addEventListener('load', function() {
    var startTime = document.getElementById("start_time");
    var html = "<option value='' selected disabled>00시</option>";
    for (var i = 0; i <= 24; i++) {
      if (i < 10) {
        html += "<option value=" + i + ">" + "0" + i + "시" + "</option>"
      } else {
        html += "<option value=" + i + ">" + i + "시" + "</option>"
      }
    }
    startTime.innerHTML = html;

    var endTime = document.getElementById("end_time");
    var endHtml = "<option value='' selected disabled>00시</option>";
    for (var i = 0; i <= 24; i++) {
      if (i < 10) {
        endHtml += "<option value=" + i + ">" + "0" + i + "시" + "</option>"
      } else {
        endHtml += "<option value=" + i + ">" + i + "시" + "</option>"
      }
    }
    endTime.innerHTML = endHtml;

    // Get the forms we want to add validation styles to                                                                     
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission                                                                        
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (checkValue(address)) {
          stop(event);
          address.style.border = "1px solid red";
          alert("주소를 입력하지 않으셨습니다.");
        } else if (form.checkValidity() === false) {
          stop(event);
          form.classList.add('was-validated');
          alert("상세주소를 입력하지 않으셨습니다.");
        } else if (checkValue(date)) {
          stop(event);
          date.style.border = "1px solid red";
          alert("일정을 입력하지 않으셨습니다.");
        } else if (checkValue(start_time)) {
          stop(event);
          start_time.style.border = "1px solid red";
          alert("시작시간을 입력하지 않으셨습니다.");
        } else if (checkValue(end_time)) {
          stop(event);
          end_time.style.border = "1px solid red";
          alert("종료시간을 입력하지 않으셨습니다.");
        } else if (checkValue(game_type)) {
          stop(event);
          game_type.style.border = "1px solid red";
          alert("경기 타입을 입력하지 않으셨습니다.");
        } else if (checkValue(gender)) {
          stop(event);
          gender.style.border = "1px solid red";
          alert("성별을 입력하지 않으셨습니다.");
        } else if (checkValue(number_appliable)) {
          stop(event);
          number_appliable.style.border = "1px solid red";
          alert("신청 가능 인원을 입력하지 않으셨습니다.");
        } else if (start_time.value > end_time.value) {
          stop(event);
          end_time.style.border = "1px solid red";
          alert("시작 시간이 종료 시간보다 늦습니다.")
        } else if (start_time.value === end_time.value) {
          if (start_time_minutes.value > end_time_minutes.value) {
            stop(event);
            end_time.style.border = "1px solid red";
            alert("시작 시간이 종료 시간보다 늦습니다.")
          }
        } else {

        }
      }, false);
    });


  }, false);
})();

function checkValue(el) {
  if (el.value == "") {
    return true;
  }
  return false;
}

function stop(event) {
  event.preventDefault();
  event.stopPropagation();
}