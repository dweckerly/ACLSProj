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
    actions = [];
    $('#report-container').fadeOut();
    $('#report-footer').fadeOut();
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

$('#edit-proc-btn').click(() => {
    $('#med-proc-edit-container').fadeOut(() => {
        newProcArr.push(0);
        paramIndex = 1;
        populateNewProcList();
        $('#add-edit-proc').fadeIn();
    });
});

function populateNewProcList() {
    $('#new-proc-list').empty();
    $(newProcedures).each(function(key, value) {
        var proc = `<a class="edit-proc waves-effect waves-light btn" onclick="editProc(` + key + `)">` + value.name + `</a>`
        $('#new-proc-list').append(proc);
    });
}

function editProc(key) {

}

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
            <a id="del-btn-` + paramIndex + `" onclick="delVal(` + paramIndex + `)" class="waves-effect waves-light btn red disabled">Delete Value</a>
        </div>
    </div>
    `);
    paramIndex++;
});

function addVal(param) {
    $('#del-btn-' + param).removeClass('disabled')
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
    if (newProcArr[param] > 0) {
        $("#new-proc-val-" + param + `-` + newProcArr[param] + "-container").remove();
        newProcArr[param] = newProcArr[param] - 1;
        if (newProcArr[param] == 0) {
            $('#del-btn-' + param).addClass('disabled')
        }
    }
}

$('#new-proc-save-btn').click(() => {
    if ($('#new-proc-name').val() == "") {
        $('#new-proc-err').html("Please enter a procedure name before proceding");
    } else {
        var newProc = {
            name: $('#new-proc-name').val(),
            params: getNewProcParams(),
            type: 'alert',
            dataTag: 'new'
        };
        saveProcedure(newProc);
    }
});

function getNewProcParams() {
    var newParamArr = [];
    for (let i = 0; i < paramIndex; i++) {
        if ($("#new-proc-param-" + i + "").val() != "") {
            var paramJson = {};
            paramJson.name = $("#new-proc-param-" + i + "").val();
            var vals = [];
            for (let j = 0; j < newProcArr[i] + 1; j++) {
                if ($("#new-proc-val-" + i + "-" + j + "").val() != "") {
                    vals.push($("#new-proc-val-" + i + "-" + j + "").val());
                }
            }
            paramJson.vals = vals;
            newParamArr.push(paramJson);
        }
    }
    console.log(newParamArr);
    return newParamArr;
}

function saveProcedure(proc) {
    newProcedures.push(proc);
    localStorage.setItem('New_Procedures', JSON.stringify(newProcedures));
    procedures.push(proc);
    resetNewProc();
}

$('#new-proc-cancel-btn').click(() => {
    resetNewProc();
});

function resetNewProc() {
    $('#new-proc-edit').fadeOut(() => {
        $('#proc-form-container').remove();
        $('#new-proc-container').append(`
        <div id="proc-form-container" class="row">
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="new-proc-name" type="text" class="validate">
                        <label for="new-proc-name">Name</label>
                    </div>
                </div>
                <div id="new-proc-parameters">
                    <a id="add-param-btn" class="btn waves-effect waves-light">Add Parameter<i class="material-icons">add</i></a>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="new-proc-param-0" type="text" class="validate">
                            <label for="new-proc-param-0">Parameter</label>
                        </div>
                    </div>
                    <div id="param-0-val-container">
                        <div class="row">
                            <div class="input-field col s6 center">
                                <input id="new-proc-val-0-0" type="text" class="validate">
                                <label for="new-proc-val-0-0">Value</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 center">
                            <a onclick="addVal(0)" class="waves-effect waves-light btn">Add Value</a>
                            <a id="del-btn-0" onclick="delVal(0)" class="waves-effect waves-light btn red disabled">Delete Value</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        `);
        $('#med-proc-edit-container').fadeIn();
    });
}