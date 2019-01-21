const metroSound = new Audio('sounds/metronome.mp3');
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