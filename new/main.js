$('#select-container').hide();

$('.toolbar-btn').prop("disabled", true);
$('#end-btn').prop("disabled", true);

$('#start-btn').click(function () {
    $('#select-container').fadeIn();
    $('.toolbar-btn').prop("disabled", false);
    $('#end-btn').prop("disabled", false);
    $("#start-btn-div").fadeOut("fast", function () {
        $.post("components/timerCard.php", {tag:'pulse'}, function (data) {
            $("#timer-container").append(data).hide().fadeIn("fast");
            startTimer(timers.code);
        });
    });
});