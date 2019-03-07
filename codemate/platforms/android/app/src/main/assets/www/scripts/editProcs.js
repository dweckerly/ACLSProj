var paramIndex = 0;
var newProcArr = [];

var editProcIndex;
var editProcFlag = false;

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
    editProcIndex = key;
    editProcFlag = true;
    resetNewProc();
    $('#new-proc-name').val(newProcedures[key].name);
    $('#new-proc-name-label').addClass("active");
    for (var i = 0; i < newProcedures[key].params.length; i++) {
        if (i > 0) {
            addNewProcParam();
        }
        $('#new-proc-param-' + i).val(newProcedures[key].params[i].name);
        $('#new-proc-param-' + i + '-label').addClass("active");
        for (var j = 0; j < newProcedures[key].params[i].vals.length; j++) {
            if (j > 0) {
                addVal(i);
            }
            $('#new-proc-val-' + i + '-' + j).val(newProcedures[key].params[i].vals[j]);
            $('#new-proc-val-' + i + '-' + j + '-label').addClass("active");
        }
    }
    $('#med-proc-edit-container').hide();
    $('#new-proc-delete-btn').show();
    $('#add-edit-proc').fadeOut(() => {
        $('#new-proc-edit').fadeIn();
    });
}

$('#add-proc-btn').click(() => {
    $('#add-edit-proc').fadeOut(() => {
        $('#new-proc-delete-btn').hide();
        $('#new-proc-edit').fadeIn();
    });
});

$('#history-btn').click(() => {
    $('#med-proc-edit-container').fadeOut(() => {
        $('#history-container').fadeIn();
    });
});

function addNewProcParam() {
    newProcArr.push(0);
    $('#new-proc-parameters').append(`
    <div class="row">
        <div class="input-field col s12">
            <input id="new-proc-param-` + paramIndex + `" type="text" class="validate">
            <label id="new-proc-param-` + paramIndex + `-label" for="new-proc-param-` + paramIndex + `">Parameter</label>
        </div>
    </div>
    <div id="param-` + paramIndex + `-val-container">
        <div id="new-proc-val-` + paramIndex + `-` + newProcArr[paramIndex] + `-container" class="row">
            <div class="input-field col s6 center">
                <input id="new-proc-val-` + paramIndex + `-` + newProcArr[paramIndex] + `" type="text" class="validate">
                <label id="new-proc-val-` + paramIndex + `-` + newProcArr[paramIndex] + `-label" for="new-proc-val-` + paramIndex + `-` + newProcArr[paramIndex] + `">Value</label>
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
}

function addVal(param) {
    $('#del-btn-' + param).removeClass('disabled')
    newProcArr[param] = newProcArr[param] + 1;
    $("#param-" + param + "-val-container").append(`
    <div id="new-proc-val-` + param + `-` + newProcArr[param] + `-container" class="row">
        <div class="input-field col s6 center">
            <input id="new-proc-val-` + param + `-` + newProcArr[param] + `" type="text" class="validate">
            <label id="new-proc-val-` + param + `-` + newProcArr[param] + `-label" for="new-proc-val-` + param + `-` + newProcArr[param] + `">Value</label>
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
    paramIndex = 0;
    newProcArr = [];
    newProcedures.push(proc);
    localStorage.setItem('New_Procedures', JSON.stringify(newProcedures));
    procedures.push(proc);
    resetNewProc();
    if (editProcFlag) {
        editProcFlag = false;
        deleteProcedure();
    }
}

$('#new-proc-cancel-btn').click(() => {
    paramIndex = 0;
    newProcArr = [];
    editProcFlag = false;
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
                        <label id="new-proc-name-label" for="new-proc-name">Name</label>
                    </div>
                </div>
                <div id="new-proc-parameters">
                    <a id="add-param-btn" class="btn waves-effect waves-light" onclick="addNewProcParam()">Add Parameter<i class="material-icons">add</i></a>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="new-proc-param-0" type="text" class="validate">
                            <label id="new-proc-param-0-label" for="new-proc-param-0">Parameter</label>
                        </div>
                    </div>
                    <div id="param-0-val-container">
                        <div class="row">
                            <div class="input-field col s6 center">
                                <input id="new-proc-val-0-0" type="text" class="validate">
                                <label id="new-proc-val-0-0-label" for="new-proc-val-0-0">Value</label>
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

function deleteProcedure() {
    paramIndex = 0;
    newProcArr = [];
    newProcedures.splice(editProcIndex, 1);
    localStorage.setItem('New_Procedures', JSON.stringify(newProcedures));
    procedures = defaultProcedures;
    $(newProcedures).each((index) => {
        procedures.push(newProcedures[index]);
    });
    returnToProcedures();
}

function returnToProcedures() {
    populateNewProcList();
    resetNewProc();
}