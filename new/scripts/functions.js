var actions = [];
var timers = {};

$(document).ready(function () {
    timers.code = {
        'id':'main',
        'min' : 0,
        'sec' : 0,
        'startTime' : timeNow(),
        'interval' : null,
        'running' : true 
    }
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
    $("#" + arr['id'] + "-timer-div").removeClass("pause");
    arr['running'] = true;
    arr['interval'] = setInterval(function () {
        if(arr['alert']) {
            if(arr['min'] == arr['alert']['min'] && arr['sec'] == arr['alert']['sec']) {
                $("#" + arr['id'] + "-timer-div").addClass("pulse-red");
            }
        }
        timerDisplay(arr);
    }, 1000);
}

function clickTimer(arr) {
    if(arr) {
        if(arr['running'] == true) {
            pauseTimer(arr);
        } else {
            startTimer(arr);
        }
    }
}

function pauseTimer(arr) {
    $("#" + arr['id'] + "-timer-card").addClass("pause");
    arr['running'] = false;
    clearInterval(arr['interval']);
}

function clearTimer(arr) {
    arr['running'] = false;
    clearInterval(arr['interval']);
    arr['min'] = 0;
    arr['sec'] = 0;
    $('#' + arr['id'] + '-minutes').html('0' + arr['min']);
    $('#' + arr['id'] + '-seconds').html('0' + arr['sec']);
}

function restartTimer(arr, tag) {
    clearTimer(arr);
    startTimer(arr);
    if(arr['count']) {
        arr['count'] = parseInt(arr['count']) + 1;
    }
    $("#" + arr['id'] + "-timer-card").removeClass('pulse-red');
    $.post("components/alertModal.php", {id:arr['aid'], tag:tag}, function(data) {
        $('#modal-container').append(data);
    });
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