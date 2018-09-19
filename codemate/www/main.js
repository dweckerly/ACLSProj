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
        startTimer(timers.code);
        createTimer("pulse", "procedure");
        // need to create pulse check timer here

        /*$.post("components/timerCard.php", { tag: 'pulse' }, function(data) {
            
            $("#timer-container").append(data).hide().fadeIn("fast");
        });*/
    });
});


$('#end-btn').click(() => {
    console.log(actions);
});

function populateMedicationModal() {
    for(let i = 0; i < medications.length; i++) {
        $('#med-btn-container').append(
            "<button data-type='" + medications[i].type + "' data-tag='" + medications[i].dataTag + "' class='btn btn-outline-secondary med-btn modal-close'>" + medications[i].name + "</button>"
        );
    }
}

function populateProcedureModal() {
    for(let i = 0; i < procedures.length; i++) {
        $('#proc-btn-container').append(
            "<button data-type='" + procedures[i].type + "' data-tag='" + procedures[i].dataTag + "' class='btn btn-outline-secondary proc-btn modal-close'>" + procedures[i].name + "</button>"
        );
    }
}

populateMedicationModal();
populateProcedureModal();

$('#medications-btn').click(function () {
    $('#medication-modal').modal();
});

$('#procedures-btn').click(function () {
    $('#procedure-modal').modal();
});

$('.med-btn').click(function () {
    var type = $(this).attr('data-type');
    var tag = $(this).attr('data-tag');
    var name = $(this).html();
    if (tag in timers) {
        restartTimer(timers[tag]);
    } else {
        if(type == "timer") {
            /*
            $.post("components/timerCard.php", {tag: tag}, function (data) {
                $('#timer-container').append(data).fadeIn("fast");
            });
            */
        }
        if(type == "alert") {
            actions.push({'name':name, 'tag': tag, 'action':'pressed', 'time':timeNow()});
            callToast(name);
        }
    }
});

$('.proc-btn').click(function () {
    var type = $(this).attr('data-type');
    var tag = $(this).attr('data-tag');
    var name = $(this).html();
    if (tag in timers) {
        restartTimer(timers[tag]);
    } else {
        if(type == "timer") {
            /*
            $.post("components/timerCard.php", {tag: tag}, function (data) {
                $('#timer-container').append(data).fadeIn("fast");
            });
            */
        }
        if(type == "alert") {
            actions.push({'name':name, 'tag': tag, 'action':'pressed', 'time':timeNow()});
            callToast(name);
        }
    }
});