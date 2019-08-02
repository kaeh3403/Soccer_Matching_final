// 달력 표시
$(function() {
    $('#date').datepicker({
       showOn: "both",
        dateFormat: 'yy-mm-dd',
        buttonImage: "images/calendar.jpg",
        buttonImageOnly: true,
        showOtherMonths: true,
        changeMonth: true,
       changeYear: true,
       selectOtherMonth: true,
       dayNamesMin: ['일','월', '화', '수', '목', '금', '토'],
       monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
       showMonthAfterYear: true,
        maxDate: "+1Y",
        minDate: "-100y",
        yearRange: "c-100:c+0"
    });
})