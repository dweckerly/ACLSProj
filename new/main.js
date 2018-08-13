$('#options-container').hide();

$(document).ready(function() {

});


$('#start-btn').click(function() {
    $('#edit-menu').fadeOut(function() {
        $('#code-timer-wrapper').fadeIn();
    });
    $('#logo-wrapper').hide();
    $('#code-timer-wrapper').show();
    $('#start-container').fadeOut(function() {
        $('#options-container').fadeIn();
        $.post("components/timerCard.php", { tag: 'pulse' }, function(data) {
            startTimer(timers.code);
            $("#timer-container").append(data).hide().fadeIn("fast");
        });
    });
});


$('#end-btn').click(() => {
    console.log(actions);
});