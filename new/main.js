$('#options-container').hide();
$('#toolbar-container').hide();

$(document).ready(function() {

});

$('#start-btn').click(function() {
    $('#edit-menu').hide();
    $('#start-container').fadeOut(function() {
        $('#options-container').fadeIn();
        $('#toolbar-container').fadeIn();
        $.post("components/timerCard.php", { tag: 'pulse' }, function(data) {
            $("#timer-container").append(data).hide().fadeIn("fast");
            startTimer(timers.code);
        });
    });
});