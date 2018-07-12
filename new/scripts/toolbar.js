$('.toolbar-btn').click(function() {
    var type = $(this).attr('data-type');
    var id = $(this).attr('data');
    var tag = $(this).attr('data-tag');
    if (tag in timers) {
        restartTimer(timers[tag], tag);
    } else {
        if (type == "timer") {
            $.post("components/timerCard.php", { tag: tag }, function(data) {
                $('#timer-container').append(data).fadeIn("fast");
                callToast(timers[tag]['name']);
            });
        }
        if (type == "alert") {
            callToast(timers[tag]['name']);
        }
    }
});

$('#end-btn').click(function() {
    // end the code..
});