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

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return mm + '-' + dd + '-' + yyyy;
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

function startTimer(arr) {
    arr['actions'] = actions[actions.length - 1];
    $("#" + arr['id'] + "-timer-card").removeClass("pause");
    arr['running'] = true;
    arr['interval'] = setInterval(function() {
        if (arr['alert']) {
            if (arr['min'] == arr['alert']['min'] && arr['sec'] == arr['alert']['sec']) {
                $("#" + arr['id'] + "-timer-card").addClass("pulse-red");
                cordova.plugins.notification.local.schedule({
                    title: arr['name'],
                    text: 'Timer expiring in ' + arr.alert.exp + ' seconds.',
                    foreground: true
                });
            }
        }
        timerDisplay(arr);
    }, 1000);
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
    startTimer(arr);
    incrementCount(arr);
    $("#" + arr['id'] + "-timer-card").removeClass('pulse-red');
    $("#" + arr['id'] + "-count").html("count: " + arr['count']);
}

function incrementCount(arr) {
    if (arr['count']) {
        arr['count'] = parseInt(arr['count']) + 1;
    }
}

function decrementCount(arr) {
    if (arr['count']) {
        arr['count'] = parseInt(arr['count']) - 1;
        if (arr.actions.time == actions[editActionId].time) {
            // deleted item is the same as the timer
            // need to restart the timer to the next startTime
        }
        $("#" + arr['id'] + "-timer-card").removeClass('pulse-red');
        $("#" + arr['id'] + "-count").html("count: " + arr['count']);
    }
    if (arr['count'] == 0) {
        clearTimer(arr);
        $("#" + arr['id'] + "-timer-card").parent().remove();
        delete timers[arr['id']];
    }
}

function callToast(name) {
    var str = name + " recorded at " + timeNow() + ".";
    M.toast({ html: str, displayLength: 800, inDuration: 200, outDuration: 200 });
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

function initMaterial() {
    $(document).ready(function() {
        $('.modal').modal();
    });
    $(document).ready(function() {
        $('.fixed-action-btn').floatingActionButton();
    });
    $(document).ready(function() {
        $('.tooltipped').tooltip();
    });
    $(document).ready(function() {
        $('.collapsible').collapsible();
    });
    $(document).ready(function() {
        $('.dropdown-trigger').dropdown();
    });
}

function createDoseArray(min, max, inc) {
    var arr = [];
    if (inc == 0) {
        arr.push(parseFloat(min).toFixed(2));
        if (max != min) {
            arr.push(parseFloat(max).toFixed(2));
        }
    } else {
        for (i = parseFloat(min); i <= parseFloat(max); i += parseFloat(inc)) {
            arr.push(i.toFixed(2));
        }
    }
    return arr;
}

var sortByProperty = function(property) {
    return function(x, y) {
        return ((x[property].toUpperCase() === y[property].toUpperCase()) ? 0 : ((x[property].toUpperCase() > y[property].toUpperCase()) ? 1 : -1));
    };
};

function setTimerConfirmData(tag) {
    var action = findLatestActionByTag(tag);
    if (action) {
        $('#timer-confirm-title').html(action.name);
        $('#timer-confirm-desc').html(action.desc);
        $('#timer-confirm-btn').attr('data-tag', tag);
    }
}

function findLatestActionByTag(dataTag) {
    for (let i = (actions.length - 1); i >= 0; i--) {
        if (actions[i].tag == dataTag) {
            return actions[i];
        }
    }
    return null;
}

function timerAlertCalc(min, sec, alert) {
    sec += (60 * min) - alert;
    min = 0;
    if (sec >= 60) {
        for (i = sec; i >= 60; i -= 60) {
            min++;
            sec -= 60;
        }
    }
    return { min: min, sec: sec, exp: alert };
}