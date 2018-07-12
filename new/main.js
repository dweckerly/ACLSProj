$('#options-container').hide();
$('#toolbar-container').hide();

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
        $('#toolbar-container').fadeIn();
        $.post("components/timerCard.php", { tag: 'pulse' }, function(data) {
            startTimer(timers.code);
            $("#timer-container").append(data).hide().fadeIn("fast");
        });
    });
});

$('.info-btn').click(function() {
    var tag = $(this).attr('data');
    var type = $(this).attr('data-type');

    $('#info-name').html(timers[tag]['name']);
    if (type == 'medication') {
        $('#proc-info').hide();
        $('#med-info').show();
        $('#med-dose').html("Dose: " + timers[tag]['doseAmount'] + " " + timers[tag]['doseUnit']);
        $('#med-route').html("Route : " + timers[tag]['route']);
    } else if (type == 'procedure') {
        $('#med-info').hide();
        $('#proc-info').show();
        $('#proc-details').html(timers[tag]['details']);
    }
});