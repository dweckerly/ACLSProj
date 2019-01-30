var paramIndex = 0;
var newProcArr = [];

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
        $('#med-proc-edit-container').show();
        $('#history-container').hide();
        $('#add-edit-proc').hide();
        $('#add-edit-med').hide();
        $('#start-container').fadeIn();
        $('#main-nav').fadeIn();
    });
});

$('#edit-med-btn').click(() => {
    $('#med-proc-edit-container').fadeOut(() => {
        $('#add-edit-med').fadeIn();
    });
});

$('#edit-proc-btn').click(() => {
    $('#med-proc-edit-container').fadeOut(() => {
        newProcArr.push(0);
        paramIndex = 1;
        $('#add-edit-proc').fadeIn();
    });
});

$('#add-edit-proc').click(() => {
    $('#add-edit-proc').fadeOut(() => {
        $('#new-proc-edit').fadeIn();
    });
});

$('#history-btn').click(() => {
    $('#med-proc-edit-container').fadeOut(() => {
        $('#history-container').fadeIn();
    });
});

$('#add-param-btn').click(() => {
    newProcArr.push(0);
    $('#new-proc-parameters').append(`
    <div class="row">
        <div class="input-field col s12">
            <input id="new-proc-param-` + paramIndex + `" type="text" class="validate">
            <label for="new-proc-param-` + paramIndex + `">Parameter</label>
        </div>
    </div>
    <div id="param-` + paramIndex + `-val-container">
        <div id="new-proc-val-` + paramIndex + `-` + newProcArr[paramIndex] + `-container" class="row">
            <div class="input-field col s6 center">
                <input id="new-proc-val-` + paramIndex + `-` + newProcArr[paramIndex] + `" type="text" class="validate">
                <label for="new-proc-val-` + paramIndex + `-` + newProcArr[paramIndex] + `">Value</label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12 center">
            <a onclick="addVal(` + paramIndex + `)" class="waves-effect waves-light btn">Add Value</a>
            <a onclick="delVal(` + paramIndex + `)" class="waves-effect waves-light btn red">Delete Value</a>
        </div>
    </div>
    `);
    paramIndex++;
});

function addVal(param) {
    newProcArr[param] = newProcArr[param] + 1;
    $("#param-" + param + "-val-container").append(`
    <div id="new-proc-val-` + param + `-` + newProcArr[param] + `-container" class="row">
        <div class="input-field col s6 center">
            <input id="new-proc-val-` + param + `-` + newProcArr[param] + `" type="text" class="validate">
            <label for="new-proc-val-` + param + `-` + newProcArr[param] + `">Value</label>
        </div>
    </div>
    `);
}

function delVal(param) {
    $("#new-proc-val-" + paramIndex + `-` + newProcArr[paramIndex] + "-container").remove();
    newProcArr[param] = newProcArr[param] - 1;
}