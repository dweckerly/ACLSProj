$('#options-container').hide();
$('#toolbar-container').hide();

$(document).ready(function () {
    
});

$('#start-btn').click(function () {
    $('#options-container').fadeIn();
    $('#toolbar-container').fadeIn();
    $('#start-container').fadeOut();
    $('#end-btn').prop("disabled", false);
    $("#start-btn-div").fadeOut("fast", function () {
        $.post("components/timerCard.php", {tag:'pulse'}, function (data) {
            $("#timer-container").append(data).hide().fadeIn("fast");
            startTimer(timers.code);
        });
    });
});