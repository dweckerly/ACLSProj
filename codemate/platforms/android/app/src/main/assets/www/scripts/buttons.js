$('#medications-btn').click(function() {
    $('#med-search').val("");
    medModalSearch();
    $(".collap-body").each(function() {
        $(this).css("display", "none");
    });
    $('#medication-modal').modal();
});

$('#procedures-btn').click(function() {
    $('#proc-search').val("");
    procModalSearch();
    $('#procedure-modal').modal();
});

function alertMeds() {
    $('.alert-med-btn').click(function() {
        var type = $(this).attr('data-type');
        var tag = $(this).attr('data-tag');
        var name = $(this).html();
        if (tag in timers) {
            restartTimer(timers[tag]);
        } else {
            if (type == "timer") {
                createTimer(tag, 'medication');
            }
            if (type == "alert") {
                actions.push({ 'name': name, 'tag': tag, 'action': 'pressed', 'time': timeNow(), 'desc': "" });
                callToast(name);
            }
        }
    });
}

function dropMeds() {
    $('.drop-med-btn').click(function() {
        if ($('#' + $(this).attr('data-tag') + '-body').css("display") == 'none') {
            $(".collap-body").each(function() {
                $(this).css("display", "none");
            });
            $('#' + $(this).attr('data-tag') + '-body').css("display", "block");
        } else {
            $(".collap-body").each(function() {
                $(this).css("display", "none");
            });
        }
        $(this).get(0).scrollIntoView({ block: "center", behavior: "smooth" });
    });
}

function confirmMeds() {
    $(".med-btn-confirm").click(function() {
        var tag = $(this).attr('data-tag');
        var name = $('#' + tag + '-btn-label').html();
        if ($('#' + tag + '-dose-select').val() != null) {
            var desc = $('#' + tag + '-dose-select').val() + " " + $('#' + tag + '-unit').html();
            var flag = false;
        } else {
            var desc = "? " + $('#' + tag + '-unit').html();
            var flag = true;
        }
        $(".collap-body").each(function() {
            $(this).css("display", "none");
        });
        actions.push({ 'name': name, 'tag': tag, 'action': 'pressed', 'time': timeNow(), 'desc': desc, 'flag': flag });
        callToast(name);
    });
}


$('#back-to-code').click(() => {
    $('#report-footer').fadeOut();
    $('#report-container').fadeOut(() => {
        $('#main-nav').fadeIn();
        $('#options-container').fadeIn();
        $('#timer-container').fadeIn();
    });
});

$('#end-btn').click(() => {
    populateReport();
    $('#main-nav').fadeOut();
    $('#options-container').fadeOut();
    $('#timer-container').fadeOut(() => {
        $('#report-container').fadeIn();
        $('#report-footer').fadeIn();
    });
});

$('#back-to-start').click(() => {
    $('#main-nav').fadeOut();
    $('#med-edit').fadeOut(function() {
        $('#start-container').fadeIn();
        $('#main-nav').fadeIn();
    });
});