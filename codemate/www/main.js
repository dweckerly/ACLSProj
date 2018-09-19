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
        /*$.post("components/timerCard.php", { tag: 'pulse' }, function(data) {
            startTimer(timers.code);
            $("#timer-container").append(data).hide().fadeIn("fast");
        });*/
    });
});


$('#end-btn').click(() => {
    console.log(actions);
});

/*
$(document).ready(function(){
    $('.modal').modal();
});
*/

function populateMedicationModal() {
    console.log(medications)
    for(let i = 1; i <= medications.length; i++) {
        console.log(medications[i]);
        $('#med-btn-container').append(
            "<button data-type='" + medications[i].type + "' data-tag='" + medications[i].dataTag + "' class='btn btn-outline-secondary med-btn modal-close'>" + medications[i].name + "</button>"
        );
    }
}

populateMedicationModal();

$('#medications-btn').click(function () {
    $('#medication-modal').modal();
});

$('.med-btn').click(function () {
    var type = $(this).attr('data-type');
    var tag = $(this).attr('data-tag');
    var name = $(this).html();
    if (tag in timers) {
        restartTimer(timers[tag]);
    } else {
        if(type == "timer") {
            $.post("components/timerCard.php", {tag: tag}, function (data) {
                $('#timer-container').append(data).fadeIn("fast");
            });
        }
        if(type == "alert") {
            actions.push({'name':name, 'tag': tag, 'action':'pressed', 'time':timeNow()});
            callToast(name);
        }
    }
});