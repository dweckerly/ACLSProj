$('.toolbar-btn').prop("disabled", true);
$('#end-btn').prop("disabled", true);

$('#start-btn').click(function () {
    $('.toolbar-btn').prop("disabled", false);
    $('#end-btn').prop("disabled", false);
    $("#start-btn-div").fadeOut("fast", function () {
        $.post("components/timerCard.php", {id: 2}, function (data) {
            $("#timer-container").append(data).hide().fadeIn("fast");
            startTimer(timers.code);
        });
    });
});