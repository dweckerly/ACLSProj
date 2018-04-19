var timerCode = null;
var timerShock = null;
var timerCPR = null;
var timerCPRPause = null;

var codeTimer = {
    'min': 0,
    'sec': 0
}
var cprTimer = {
    'min': 0,
    'sec': 0
}
var shockTimer = {
    'min': 0,
    'sec': 0
}
var medTimer = {
    'min': 0,
    'sec': 0
}

shockCount = 0;
shock = false;

cprPause = true;
cprPauseCount = 0;

//shock button click functionality
$('#shock-btn').click(function() {
    $('#shock-btn-div').fadeOut('fast', function() {
        $('#shock-timer-div').fadeIn("fast", function() {});
    });
    shockClick();
});

$('#shock-btn-shock').click(function() {
    shockClick();
});

function shockClick() {
    if(!cprPause) {
        $('#cpr-btn-cpr').removeClass('btn-info').addClass('btn-secondary');
        $('#cpr-btn-cpr').html('<i class="fa fa-play" style="font-size:24px;color:rgb(255, 255, 255);"></i>')
        cprPauseTimer();
        cprPause = true;
    }
    shockCount++;
    $('#shock-badge').html(shockCount);
    clearInterval(timerShock);
    clearTimer('shock', shockTimer);
    timerShock = setInterval(function() {
        timerDisplay('shock', shockTimer);
    }, 1000);
}

$('#cpr-btn').click(function() {
    cprPause = false;
    $('#cpr-btn-div').fadeOut('fast', function() {
        $('#cpr-timer-div').fadeIn("fast", function() {});
    });
    cprClick();
});

$('#cpr-btn-cpr').click(function () {
    if(!cprPause) {
        $('#cpr-btn-cpr').removeClass('btn-info').addClass('btn-secondary');
        $('#cpr-btn-cpr').html('<i class="fa fa-play" style="font-size:24px;color:rgb(255, 255, 255);"></i>')
        cprPauseTimer();
        cprPause = true;
    } else {
        $('#cpr-btn-cpr').removeClass('btn-secondary').addClass('btn-info');
        $('#cpr-btn-cpr').html('<i class="fa fa-pause" style="font-size:24px;color:rgb(255, 255, 255);"></i>')
        cprClick();
        cprPause = false;
    }
});

function cprPauseTimer() {
    clearInterval(timerCPR);
    $('#cpr-badge').html(cprPauseCount);
    timerCPRPause = setInterval(function() {
        cprPauseCount++;
        $('#cpr-badge').html(cprPauseCount);
        if(cprPauseCount < 10 && cprPauseCount >= 5) {
            $('#cpr-container').addClass('pulse-warn');
        }
        if(cprPauseCount >= 10) {
            $('#cpr-container').removeClass('pulse-warn').addClass('pulse-danger');
        }
    }, 1000);
}

function cprClick() {
    clearInterval(timerCPRPause);
    $('#cpr-container').removeClass('pulse-warn');
    $('#cpr-container').removeClass('pulse-danger');
    clearTimer('cpr', cprTimer);
    $('#cpr-badge').html('-');
    cprPauseCount = 0;
    timerCPR = setInterval(function() {
        timerDisplay('cpr', cprTimer);
    }, 1000);
}

// start button click functionality
$('#start-btn').click(function() {
    $('#start-btn-div').fadeOut( "slow", function() {
        timerCode = setInterval(function() {
            timerDisplay('code', codeTimer);
        }, 1000);
        $('#code-timer-div').fadeIn('slow', function() {});
        $('#shock-btn').fadeIn('slow', function() {});
        $('#cpr-btn').fadeIn('slow', function() {});
        $('#med-btn').fadeIn('slow', function() {});
    });
});

function timerDisplay(id, arr) {
    arr['sec']++;
    if(arr['sec'] == 60) {
        arr['sec'] = 0;
        arr['min']++;
        if(arr['min'] == 60) {
            arr['min'] = 0;
        } 
        if(arr['min'] < 10) {
            $('#' + id + '-minutes').html('0' + arr['min']);
        } else {
            $('#' + id + '-minutes').html(arr['min']);
        }
    }
    if(arr['sec'] < 10) {
        $('#' + id + '-seconds').html('0' + arr['sec']);
    } else {
        $('#' + id + '-seconds').html(arr['sec']);
    }
}

function clearTimer(id, arr) {
    arr['sec'] = 0;
    arr['min'] = 0;
    $('#' + id + '-seconds').html('00');
    $('#' + id + '-minutes').html('00');
}   