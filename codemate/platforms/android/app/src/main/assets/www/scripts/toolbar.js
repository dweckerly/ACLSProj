const metroSound = new Audio('sounds/metronome.mp3');

$('.toolbar-btn').click(function() {
    var type = $(this).attr('data-type');
    var tag = $(this).attr('data-tag');
    if (tag in timers) {
        restartTimer(timers[tag]);
    } else {
        if (type == "timer") {
            $.post("components/timerCard.php", { tag: tag }, function(data) {
                $('#timer-container').append(data).fadeIn("fast");
            });
        }
        if (type == "alert") {
            callToast(timers[tag]['name']);
            actions.push({ 'name': timers['name'], 'tag': tag, 'action': 'recorded', 'time': timeNow() });
        }
    }
});

$('#end-btn').click(function() {
    // end the code..
});

var met = false;
var metronomeInterval;
$('#metronome-btn').click(function() {
    if (met) {
        metronomeInterval.cancel();
        met = false;
        $(this).removeClass('pause');
    } else {
        met = true;
        $(this).addClass('pause');
        metronomeInterval = accurateInterval(600, function() {
            metroSound.play();
        });
    }
});