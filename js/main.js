var timerCode = null;
var timerShock = null;

var codeTimer = {
    'hr': 0,
    'min': 0,
    'sec': 0,
    'mili': 0
}
var shockTimer = {
    'hr': 0,
    'min': 0,
    'sec': 0
}
var medTimer = {
    'hr': 0,
    'min': 0,
    'sec': 0
}

shockCount = 0;
shock = false;

//shock button click functionality
$('#shock-btn').click(function() {
    $('#shock-btn-div').fadeOut('fast', function() {
        $('#shock-timer-div').fadeIn("fast", function() {});
    });
    shockCount++;
    $('#shock-badge').html(shockCount);
    clearInterval(timerShock);
    clearTimer('shock', shockTimer);
    timerShock = setInterval(function() {
        timerDisplay('shock', shockTimer);
    }, 1000);
});

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
            arr['hr']++;
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
    arr['hr'] = 0;
    $('#' + id + '-seconds').html('00');
    $('#' + id + '-minutes').html('00');
    $('#' + id + '-hours').html('00');
}   