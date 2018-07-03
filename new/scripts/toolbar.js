$('.toolbar-btn').click(function () {
    var type = $(this).attr('data-type');
    var id = $(this).attr('data');
    var tag = $(this).attr('data-tag');
    if (tag in timers) {
        restartTimer(timers[tag]);
    } else {
        if(type == "timer") {
            $.post("components/timerCard.php", {id: id}, function (data) {
                $('#timer-container').append(data).fadeIn("fast");
            });
        }
        if(type == "alert") {
            $.post("components/alertModal.php", {id: id}, function (data) {
                $('#timer-container').append(data).fadeIn("fast");
            });
        }
    }
});

$('#end-btn').click(function () {
    // end the code..
});