var actions = [];
/*
var test = "someKey";
timers[test] = {
    'id': "it works!"
}
console.log(timers.someKey['id']);
*/

$(document).ready(function () {
    timers.code = {
        'id':'main-timer',
        'min' : 0,
        'sec' : 0,
        'startTime' : timeNow(),
        'interval' : null,
        'running' : true 
    };

    timers.pulse = {
        'id' : 'pulse-timer',
        'min' : 0,
        'sec' : 0,
        'startTime' : timeNow(),
        'interval' : null,
        'running' : true,
        'alert' : {
            'min' : 1,
            'sec' : 45
        }
    }
    actions.push(timers.code, timers.pulse);

    startTimer(timers.code);
    startTimer(timers.pulse);

    $('#pulse-timer-restart').click(function () {
        event.stopPropagation();
        restartTimer(timers.pulse);
        $('#pulse-timer-div').removeClass('pulse');
    });

    $('.timer-card').click(function () {
        var id = $(this).attr('data');
        clickTimer(timers[id]);
    });
});

$('.restart-timer').click(function () {
    var id = $(this).attr('data');
    event.stopPropagation();
    restartTimer(timers[id]);
    $("#" + id + "-timer-div").removeClass('pulse');
});

function timeNow() {
    var d = new Date(),
        h = (d.getHours()<10?'0':'') + d.getHours(),
        m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    return h + ':' + m;
}

function timerDisplay(arr) {
    arr['sec']++;
    if(arr['sec'] == 60) {
        arr['sec'] = 0;
        arr['min']++;
        if(arr['min'] < 10) {
            $('#' + arr['id'] + '-minutes').html('0' + arr['min']);
        } else {
            $('#' + arr['id'] + '-minutes').html(arr['min']);
        }
    }
    if(arr['sec'] < 10) {
        $('#' + arr['id'] + '-seconds').html('0' + arr['sec']);
    } else {
        $('#' + arr['id'] + '-seconds').html(arr['sec']);
    }
}

function startTimer(arr) {
    arr['interval'] = setInterval(function () {
        if(arr['alert']) {
            if(arr['min'] == arr['alert']['min'] && arr['sec'] == arr['alert']['sec']) {
                $("#" + arr['id'] + "-div").addClass("pulse");
            }
        }
        timerDisplay(arr);
    }, 1000);
}

function clickTimer(arr) {
    if(arr) {
        if(arr['running']) {
            arr['running'] = false;
            pauseTimer(arr['interval']);
        } else {
            arr['running'] = true;
            startTimer(arr);
        }
    }
}

function pauseTimer(interval) {
    clearInterval(interval);
}

function clearTimer(arr) {
    clearInterval(arr['interval']);
    arr['min'] = 0;
    arr['sec'] = 0;
    $('#' + arr['id'] + '-minutes').html('0' + arr['min']);
    $('#' + arr['id'] + '-seconds').html('0' + arr['sec']);
}

function restartTimer(arr) {
    clearTimer(arr);
    startTimer(arr);
    if(arr['count']) {
        arr['count'] = parseInt(arr['count']) + 1;
    }
}

function createMedTimer(name, id, dose, route, alert, time, max, maxDose, timer) {
    timers[name] = {
        'id' : id,
        'min' : 0,
        'sec' : 0,
        'startTime' : {
            '1' : timeNow()
        },
        'interval' : null,
        'count' : 1,
        'max' : max,
        'dose' : dose,
        'maxDose' : maxDose,
        'route' : route,
        'alert' : alert,
        'time' : time,
        'timer' : timer
    }
}

function checkDose(arr) {
    var count = parseInt(arr['count'])  + 1;
    var totalDose = parseFloat(arr['dose']) * count;
    if(arr['max']) {
        if(count > arr['max']) {
            // too many
        }
    }
    
    if(arr['maxDose']) {
        if(totalDose > arr['maxDose']) {
            // too much
        }
    }

    arr['count'] = parseInt(arr['count']) + 1;
}

function createBaseTimer() {

}

$('#epi-btn').click(function () {
    $.post("components/timerCard.php", {id: 1}, function (data) {
        $('#timer-container').append(data).fadeIn("fast", function () {
            startTimer(timers.epi);
            $('.timer-card').click(function () {
                var id = $(this).attr('data');
                clickTimer(timers[id]);
            });
        });
    });
});