$(document).ready(function () {
   
    var date = moment().format("ddd MMM Do, YYYY");
    $("#currentDay").text(date);
    var time = moment();
    var textValue = $(this).siblings('.description').val();
    var textTime = $(this).parent().attr('id');

    $('.row').each(
        function (_, element) {
            var id = this.id;
            var hourEl = element.getElementsByClassName('hour');
           var hour = hourEl && hourEl[0].innerHTML;
            var textBox = element.getElementsByTagName('textarea');
            var textData = window.localStorage.getItem('schedule');
            var textArray = textData && JSON.parse(textData);
            textArray && textArray.forEach(data => {
                if (!data) {
                return;
                }
                if (data.time === id) {
                    var text = data.description;
                     $(textBox).val(text);
                    return;
                } else {
                    return;
                }
            });

            var defaultTime = time;
            var timeFormat = moment(defaultTime, "HH A").format("hh A");
            var momentHour = moment(hour, "HHA").format("hh A");

            var momentTimeFormat = moment(timeFormat, 'h:mma');
            var momentMomentHour = moment(momentHour, 'h:mma');

            if (timeFormat === momentHour) {
                var roho = textBox && $(textBox).css('background-color', 'red'); 
                console.log(roho);
            }
            else if(momentMomentHour.isBefore(momentTimeFormat)) {
            textBox && $(textBox).css('background-color', 'grey'); 
            }
            else if(momentMomentHour.isAfter(momentTimeFormat)) {
                textBox && $(textBox).css('background-color', 'green'); 
            }
            

        }
    )

$('.saveBtn').on('click', function () {
    
    var textValue = $(this).siblings('.description').val();
    var textTime = $(this).parent().attr('id');

    var currentTimeBlock = window.localStorage.getItem('schedule');

    
    var parsedData = currentTimeBlock && JSON.parse(currentTimeBlock) || [];

    var newTimeBlock = {
        time: textTime, 
        description: textValue
    };

    var scheduleData = [...parsedData, newTimeBlock];
    var convertedNewTimeBlock = JSON.stringify(scheduleData);
window.localStorage.setItem('schedule', convertedNewTimeBlock);
})
})