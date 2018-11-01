var actions = [];
var timers = {};

$(document).ready(function() {
    timers.code = {
        'id': 'main',
        'name': 'Code Start',
        'min': 0,
        'sec': 0,
        'startTime': timeNow(),
        'interval': null,
        'running': true
    }
});

function timeNow() {
    var d = new Date(),
        h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(),
        s = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    return h + ':' + m + ':' + s;
}

function timerDisplay(arr) {
    arr['sec']++;
    if (arr['sec'] == 60) {
        arr['sec'] = 0;
        arr['min']++;
        if (arr['min'] < 10) {
            $('#' + arr['id'] + '-minutes').html('0' + arr['min']);
        } else {
            $('#' + arr['id'] + '-minutes').html(arr['min']);
        }
    }
    if (arr['sec'] < 10) {
        $('#' + arr['id'] + '-seconds').html('0' + arr['sec']);
    } else {
        $('#' + arr['id'] + '-seconds').html(arr['sec']);
    }
}

function startTimer(arr, restart) {
    if (restart) {
        actions.push({ 'name': arr['name'], 'tag': arr['id'], 'action': 'restart', 'time': timeNow(), 'desc': "" });
    } else {
        actions.push({ 'name': arr['name'], 'tag': arr['id'], 'action': 'start', 'time': timeNow(), 'desc': "" });
    }
    arr['actions'] = actions[actions.length - 1];
    callToast(arr['name']);
    $("#" + arr['id'] + "-timer-card").removeClass("pause");
    arr['running'] = true;
    arr['interval'] = setInterval(function() {
        if (arr['alert']) {
            if (arr['min'] == arr['alert']['min'] && arr['sec'] == arr['alert']['sec']) {
                $("#" + arr['id'] + "-timer-card").addClass("pulse-red");
                cordova.plugins.notification.local.schedule({
                    title: arr['name'],
                    text: 'Timer expiring in 15 seconds.',
                    foreground: true
                });
            }
        }
        timerDisplay(arr);
    }, 1000);
}

function alertCallback() {

}

function clickTimer(arr) {
    if (arr) {
        if (arr['running'] == true) {
            pauseTimer(arr);
        } else {
            startTimer(arr);
        }
    }
}

function pauseTimer(arr) {
    $("#" + arr['id'] + "-timer-card").addClass("pause");
    arr['running'] = false;
    actions.push({ 'name': arr['name'], 'tag': arr['id'], 'action': 'pause', 'time': timeNow(), 'desc': "" });
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

function restartTimer(arr) {
    clearTimer(arr);
    startTimer(arr, true);
    if (arr['count']) {
        arr['count'] = parseInt(arr['count']) + 1;
    }
    $("#" + arr['id'] + "-timer-card").removeClass('pulse-red');
}

function callToast(name) {
    var str = name + " recorded at " + timeNow() + ".";
    M.toast({ html: str, displayLength: 2000 });
}

function clearAllIntervals() {

}

function checkDose(arr) {
    var count = parseInt(arr['count']) + 1;
    var totalDose = parseFloat(arr['dose']) * count;
    if (arr['max']) {
        if (count > arr['max']) {
            // too many
        }
    }

    if (arr['maxDose']) {
        if (totalDose > arr['maxDose']) {
            // too much
        }
    }
    arr['count'] = parseInt(arr['count']) + 1;
}

function medModalSearch() {
    // Declare variables
    var input, filter, ul, li, i;
    input = document.getElementById('med-search');
    filter = input.value.toUpperCase();
    ul = document.getElementById("med-btn-container");
    li = ul.getElementsByTagName('button');
    for (i = 0; i < li.length; i++) {
        if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function procModalSearch() {
    var input, filter, ul, li, i;
    input = document.getElementById('proc-search');
    filter = input.value.toUpperCase();
    ul = document.getElementById("proc-btn-container");
    li = ul.getElementsByTagName('button');
    for (i = 0; i < li.length; i++) {
        if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function displayInfo() {

}