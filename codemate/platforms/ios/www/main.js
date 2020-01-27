$('#options-container').hide();
$('#report-container').hide();

var editActionId;

var oralSelect = false;
var nasalSelect = false;

var ivParams = {
    "gauge": "",
    "side": "",
    "site": ""
}

function clearVars() {
    ivParams = {
        "gauge": "",
        "side": "",
        "site": ""
    }
    $("#site-selection-params").html("Gauge: , Side: , Site: ");
}

function ivSelection(action, param) {
    ivParams[action] = param;
    $("#site-selection-params").html("Gauge: " + ivParams['gauge'] + ", Side: " + ivParams['side'] + ", Site: " + ivParams['site']);
}

$(document).ready(function() {

});

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {}

$('#start-btn').click(function() {
    $('#view-report-delete-btn').hide();
    $('#print-report').hide();
    $('#term-reason').hide();
    $('#code-term').show();
    $('#logo-wrapper').hide();
    $('#code-timer-wrapper').show();
    populateMedicationModal();
    $('#start-container').fadeOut(function() {
        $('#options-container').fadeIn();
        $('#rhythm-footer').fadeIn();
        startTimer(timers.code);
        $('#pulse-btn').click();
    });
});

$('#main-back-btn').click(() => {
    $('#back-confirm-modal').modal();
});

function populateReport() {
    $('#report-table-body').remove();
    $('#report-table').append(`<tbody id="report-table-body">
    </tbody>`)
    if (actions.length > 0) {
        $('#code-start').html("Code Started: " + actions[0].time);
        $('#elapsed-time').html("Elapsed time: " + $('#main-minutes').html() + ":" + $('#main-seconds').html());
        for (let i = 0; i < actions.length; i++) {
            if (actions[i].name != "elapsed time") {
                if ('flag' in actions[i]) {
                    if (actions[i].flag) {
                        $('#report-table-body').append(`
                            <tr class='report-row modal-trigger' bgcolor="#f0e68c" data-target="report-modal" data='` + i + `'> 
                            <td> ` + actions[i].name + ` </td> 
                            <td class="report-desc"> ` + actions[i].desc + ` </td> 
                            <td> ` + actions[i].time + ` </td> 
                            </tr>`);
                    } else {
                        $('#report-table-body').append(`
                        <tr class='report-row modal-trigger' data-target="report-modal" data='` + i + `'> 
                        <td> ` + actions[i].name + ` </td> 
                        <td class="report-desc"> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`);
                    }
                } else {
                    $('#report-table-body').append(`
                        <tr class='report-row modal-trigger' data-target="report-modal" data='` + i + `'> 
                        <td> ` + actions[i].name + ` </td> 
                        <td class="report-desc"> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`);
                }
            }
        }
        $('#report-table-body').append(`<script>
            $('.report-row').click(function () {
                showReportDetails($(this).attr('data'));
            });
        </script>`);
    }
}

function showReportDetails(id) {
    $('#report-action-name').val(actions[id].name);
    $('#report-action-time').val(actions[id].time);
    $('#report-action-description').val(actions[id].desc);
    editActionId = id;
    $('#report-modal').modal();
}

function populateMedicationModal() {
    medications.sort(sortByProperty('name'));
    for (let i = 0; i < medications.length; i++) {
        if (medications[i].route == 'drip' && medications[i].timer == false) {
            if (medications[i].dose.length > 1) {
                $('#med-btn-container').append(`
                <a class='dropdown-trigger btn btn-outline-secondary yellow lighten-3 drip drop-med-btn med-btn' href='#' data-target='dropdown-` + medications[i].dataTag + `' data-tag="` + medications[i].dataTag + `">` + medications[i].name + ` DRIP</a>
                <ul id='dropdown-` + medications[i].dataTag + `' class='dropdown-content'>
                    ` + returnDoseOptions(medications[i], i, false) + `
                </ul>
                `);
            } else {
                $('#med-btn-container').append(`
                <a onclick="confirmMeds(` + i + `, ` + medications[i].dose[0] + `, ` + false + `)" class='btn btn-outline-secondary yellow lighten-3 drip med-btn-confirm modal-close med-btn'>` + medications[i].name + ` DRIP</a>
                `);
            }
        } else if (medications[i].route == 'drip' && medications[i].timer != false) {
            if (medications[i].dose.length > 1) {
                $('#med-btn-container').append(`
                <a class='dropdown-trigger btn btn-outline-secondary yellow lighten-3 drip drop-med-btn med-btn' href='#' data-target='dropdown-` + medications[i].dataTag + `' data-tag="` + medications[i].dataTag + `">` + medications[i].name + ` DRIP</a>
                <ul id='dropdown-` + medications[i].dataTag + `' class='dropdown-content'>
                    ` + returnDoseOptions(medications[i], i, true) + `
                </ul>
                `);
            } else {
                $('#med-btn-container').append(`
                <a onclick="confirmMeds(` + i + `, ` + medications[i].dose[0] + `, ` + true + `)" class='btn btn-outline-secondary yellow lighten-3 drip med-btn-confirm modal-close med-btn'>` + medications[i].name + ` DRIP</a>
                `);
            }
        } else if (medications[i].route == 'IVP' && medications[i].timer == false) {
            if (medications[i].dose.length > 1) {
                $('#med-btn-container').append(`
                <a class='dropdown-trigger btn btn-outline-secondary drop-med-btn med-btn' href='#' data-target='dropdown-` + medications[i].dataTag + `' data-tag="` + medications[i].dataTag + `">` + medications[i].name + `</a>
                <ul id='dropdown-` + medications[i].dataTag + `' class='dropdown-content'>
                    ` + returnDoseOptions(medications[i], i, false) + `
                </ul>
                `);
            } else {
                $('#med-btn-container').append(`
                <a onclick="confirmMeds(` + i + `, ` + medications[i].dose[0] + `, ` + false + `)" class='btn btn-outline-secondary med-btn-confirm modal-close med-btn'>` + medications[i].name + `</a>
                `);
            }
        } else if (medications[i].route == 'IVP' && medications[i].timer != false) {
            if (medications[i].dose.length > 1) {
                $('#med-btn-container').append(`
                <a class='dropdown-trigger btn btn-outline-secondary drop-med-btn med-btn' href='#' data-target='dropdown-` + medications[i].dataTag + `' data-tag="` + medications[i].dataTag + `">` + medications[i].name + `</a>
                <ul id='dropdown-` + medications[i].dataTag + `' class='dropdown-content'>
                    ` + returnDoseOptions(medications[i], i, true) + `
                </ul>
                `);
            } else {
                $('#med-btn-container').append(`
                <a onclick="confirmMeds(` + i + `, ` + medications[i].dose[0] + `, ` + true + `)" class='btn btn-outline-secondary med-btn-confirm modal-close med-btn'>` + medications[i].name + `</a>
                `);
            }
        } else {

        }
    }
    dropMeds();
    alertMeds()
    initMaterial();
}

function returnDoseOptions(med, i, timer) {
    let opts = "";
    med.dose.forEach(function(e) {
        opts += "<li class='modal-close' onclick='confirmMeds(" + i + ", " + e + ", " + timer + ");'><a href='#!'>" + e + " " + med.unit + "</a></li> ";
    });
    return opts;
}

function populateProcedureModal() {
    procedures.sort(sortByProperty('name'));
    for (let i = 0; i < procedures.length; i++) {
        if (procedures[i].dataTag == 'iv') {
            $('#proc-btn-container').append(`
            <button data-type='` + procedures[i].type + `' data-tag='` + procedures[i].dataTag + `' data-target='site-selection-modal' class='btn btn-outline-secondary proc-btn modal-trigger modal-close'>` + procedures[i].name + `</button>
            `);
        } else if (procedures[i].dataTag == 'interos') {
            $('#proc-btn-container').append(`
            <button data-type='` + procedures[i].type + `' data-tag='` + procedures[i].dataTag + `' data-target='io-selection-modal' class='btn btn-outline-secondary proc-btn modal-trigger modal-close'>` + procedures[i].name + `</button>
            `);
        } else if (procedures[i].dataTag == 'pulse') {
            $('#proc-btn-container').append(`
            <button id="pulse-btn" data-type='` + procedures[i].type + `' data-tag='` + procedures[i].dataTag + `' data-target='pulse-selection-modal' class='btn btn-outline-secondary proc-btn modal-trigger modal-close'>` + procedures[i].name + `</button>
            `);
        } else if (procedures[i].dataTag == 'intubat') {
            $('#proc-btn-container').append(`
            <button data-type='` + procedures[i].type + `' data-tag='` + procedures[i].dataTag + `' data-target='intu-selection-modal' class='btn btn-outline-secondary proc-btn modal-trigger modal-close'>` + procedures[i].name + `</button>
            `);
        } else if (procedures[i].dataTag == 'nasogas') {
            $('#proc-btn-container').append(`
            <button data-type='` + procedures[i].type + `' data-tag='` + procedures[i].dataTag + `' data-target='naso-selection-modal' class='btn btn-outline-secondary proc-btn modal-trigger modal-close'>` + procedures[i].name + `</button>
            `);
        } else if (procedures[i].dataTag == 'pacing') {
            $('#proc-btn-container').append(`
            <button data-type='` + procedures[i].type + `' data-tag='` + procedures[i].dataTag + `' data-target='pacing-selection-modal' class='btn btn-outline-secondary proc-btn modal-trigger modal-close'>` + procedures[i].name + `</button>
            `);
        } else if (procedures[i].dataTag == 'new') {
            $('#proc-btn-container').append(
                "<button data-type='" + procedures[i].type + "' data-tag='" + procedures[i].dataTag + "' data-target='new-proc-modal' class='btn btn-outline-secondary proc-btn modal-close modal-trigger' onclick='newProcPopulate(" + i + ")'>" + procedures[i].name + "</button>"
            );
        } else {
            $('#proc-btn-container').append(
                "<button data-type='" + procedures[i].type + "' data-tag='" + procedures[i].dataTag + "' class='btn btn-outline-secondary proc-btn modal-close'>" + procedures[i].name + "</button>"
            );
        }
    }
}
populateProcedureModal();

$('.proc-btn').click(function() {
    var type = $(this).attr('data-type');
    var tag = $(this).attr('data-tag');
    var name = $(this).html();
    if (tag == 'iv') {
        showSiteOptions();
    } else if (tag == 'interos') {
        showIOOptions();
    } else if (tag == 'intubat') {
        showIntubationOptions();
    } else if (tag == 'pulse') {
        showPulseOptions();
    } else if (tag == 'nasogas') {
        //showNasoOptions();
    } else if (tag == 'pacing') {

    } else if (tag == 'new') {

    } else {
        if (tag in timers) {
            restartTimer(timers[tag]);
        } else {
            if (type == "timer") {
                createTimer(tag, 'procedure');
            }
            if (type == "alert") {
                actions.push({ 'name': name, 'tag': tag, 'action': 'pressed', 'time': timeNow(), 'desc': "" });
                callToast(name);
            }
        }
    }
});

function newProcPopulate(key) {
    $('#new-proc-confirm').attr('data-tag', key);
    $('#new-proc-title').html(procedures[key].name);
    $('#new-selection-container').empty();
    $(procedures[key].params).each(function() {
        let id = "new-select-" + this.name.replace(/\s/g, "");
        $('#new-selection-container').append(`
        <div class="input-field col s12">
            <select id="` + id + `">
                <option value="" disabled selected>` + this.name + `</option>
        `);
        $(this.vals).each(function() {
            $('#' + id).append(`
                <option value="` + this + `">` + this + `</option>
            `);
        });
        $('#new-selection-container').append(`
            </select>
        </div>`);
    });
    $(document).ready(function() {
        $('select').formSelect();
    });
}

$('#new-proc-confirm').click(function() {
    let id = $(this).attr('data-tag');
    let name = procedures[id].name;
    let tag = procedures[id].dataTag;
    let desc = "";
    let flag = false;
    $('#new-selection-container').find('select').each(function() {
        let label = this.id.replace('new-select-', "");
        let val = $(this).val();
        if (val == null || val == undefined || val == "") {
            flag = true;
            val = '?';
        }
        desc += label + ': ' + val + ', ';
    });
    desc = desc.slice(0, -2);
    actions.push({ 'name': name, 'tag': tag, 'action': 'pressed', 'time': timeNow(), 'desc': desc, 'flag': flag });
    callToast(name);
});

$('#select-site-confirm').click(() => {
    var desc = $("#site-selection-params").html();
    var flag = false;
    if(ivParams['gauge'] == "" || ivParams['side'] == "" || ivParams['site'] == "") {
        flag  = true;
    }   
    clearVars();
    actions.push({ 'name': 'IV', 'tag': 'iv', 'action': 'pressed', 'time': timeNow(), 'desc': desc, flag: flag });
    callToast('IV');
});

$('#io-selection-confirm').click(() => {
    let size = $('#io-select-size').val();
    let side = $('#io-select-side').val();
    let site = $('#io-select-site').val();
    var flag = false;
    if (size == null) {
        size = "Size: ?";
        flag = true;
    }
    if (site == null) {
        site = "Site: ?";
        flag = true;
    }
    if (side == null) {
        side = "Side: ?";
        flag = true;
    }
    actions.push({ 'name': 'Intraosseous', 'tag': 'interos', 'action': 'pressed', 'time': timeNow(), 'desc': size + ", " + side + " " + site, flag: flag });
    callToast('Intraosseous');
});

$('#pulse-no-action').click(() => {
    pulseSelection("none", 0)
});

function pulseSelection(action, charge) {
    var flag = false;
    if(action == "none") {
        var desc = "Check for pulse"
    } else if (action == "defib") {
        var desc = "Defibrillation " + charge +  " joules";
    } else if (action == "sync") {
        var desc = "Sync. Cardioversion " + charge + " joules";
    } else {
        var desc = "Pulse check ?";
        flag = true;
    }
    if ('pulse' in timers) {
        if(timers['pulse']['min'] > timers['pulse']['alert']['min']) {

        } else if (timers['pulse']['min'] >= timers['pulse']['alert']['min'] && timers['pulse']['sec'] > timers['pulse']['alert']['sec']) {
            flag = true;
        }
        restartTimer(timers['pulse']);
    } else {
        createTimer("pulse", "procedure");
    }
    actions.push({ 'name': 'Pulse Check', 'tag': 'pulse', 'action': 'pressed', 'time': timeNow(), 'desc': desc, flag: flag });
    callToast('Pulse Check');
    return false;
}

$('#pacing-selection-confirm').click(() => {
    let rate = $('#pacing-select-rate').val();
    let ma = $('#pacing-select-ma').val();
    let flag = false;
    if (rate == null || ma == null) {
        flag = true;
    }
    let desc = "Rate: " + rate + ", MA: " + ma;
    actions.push({ 'name': 'Pacing', 'tag': 'pacing', 'action': 'pressed', 'time': timeNow(), 'desc': desc, flag: flag });
    callToast('Pacing');
});

$('#report-edit-btn').click(() => {
    let name = $('#report-action-name').val();
    let time = $('#report-action-time').val();
    let desc = $('#report-action-description').val();
    actions[editActionId].name = name;
    actions[editActionId].time = time;
    actions[editActionId].desc = desc;
    if ('flag' in actions[editActionId]) {
        if (actions[editActionId].flag) {
            actions[editActionId].flag = false;
        }
    }
    populateReport();
});

$('#report-delete-btn').click(() => {
    if (timers[actions[editActionId].tag]) {
        decrementCount(timers[actions[editActionId].tag]);
    }
    actions.splice(editActionId, 1);
    populateReport();
});

function showPulseOptions() {
    $('#cardio-options-container').hide();
    cardioOptionsVisible = false;
    $('#defib-options-container').hide();
    defibOptionsVisible = false;
    $('#pulse-defib-btn').removeClass('red');
    $('#pulse-cardio-btn').removeClass('red');
    $('#pulse-selection-modal').modal();
}

function showIntubationOptions() {
    oralSelect = false;
    $('#intu-oral-select').removeClass('red');
    nasalSelect = false;
    $('#intu-nasal-select').removeClass('red');
    $('#intu-selection-modal').modal();
}

function showIOOptions() {

}

function showSiteOptions() {

}

$('#intu-oral-select').click(() => {
    if (!oralSelect) {
        oralSelect = true;
        $('#intu-oral-select').addClass('red');
    }

    if (nasalSelect) {
        nasalSelect = false;
        $('#intu-nasal-select').removeClass('red');
    }
});

$('#intu-nasal-select').click(() => {
    if (!nasalSelect) {
        nasalSelect = true;
        $('#intu-nasal-select').addClass('red');
    }

    if (oralSelect) {
        oralSelect = false;
        $('#intu-oral-select').removeClass('red');
    }
});

$('#intu-selection-confirm').click(() => {
    var flag = false;
    if ($('#intu-select-size').val() == null) {
        flag = true;
        var size = '';
    } else {
        var size = $('#intu-select-size').val();
    }

    if ($('#intu-select-depth').val() == null) {
        flag = true;
        var depth = '';
    } else {
        var depth = $('#intu-select-depth').val();
    }

    if (oralSelect) {
        var desc = "Oral - Size: " + size + ", Depth: " + depth;
    } else if (nasalSelect) {
        var desc = "Nasal - Size: " + size + ", Depth: " + depth;
    } else {
        flag = true;
        var desc = "Size: " + size + ", Depth: " + depth;
    }
    actions.push({ 'name': 'Intubation', 'tag': 'intubat', 'action': 'pressed', 'time': timeNow(), 'desc': desc, flag: flag });
    callToast('Intubation');
});

$('#naso-selection-confirm').click(() => {
    var flag = false;
    if ($('#naso-select-size').val() == null) {
        flag = true;
        var size = '';
    } else {
        var size = $('#naso-select-size').val();
    }

    if (flag) {
        var desc = "";
    } else {
        var desc = "Size: " + size;
    }
    actions.push({ 'name': 'Nasogastric Tube', 'tag': 'nasogas', 'action': 'pressed', 'time': timeNow(), 'desc': desc, flag: flag });
    callToast('Nasogastric Tube');
});

function createTimer(tag, type) {
    var data, item;
    if (type == 'procedure') {
        data = procedures;
    } else if (type == 'medication') {
        data = medications;
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].dataTag == tag) {
            item = data[i];
        }
    }
    let alertTime = timerAlertCalc(item.timer.min, item.timer.sec, item.timer.alert)
    if (type == 'procedure') {
        timers[item.dataTag] = {
            'id': item.dataTag,
            'name': item.name,
            'type': 'procedure',
            'min': 0,
            'sec': 0,
            'startTime': timeNow(),
            'interval': null,
            'running': true,
            'count': 1,
            'alert': {
                'min': alertTime.min,
                'sec': alertTime.sec,
                'exp': alertTime.exp
            },
            'details': item.details
        };
    } else if (type == 'medication') {
        timers[item.dataTag] = {
            'id': item.dataTag,
            'name': item.name,
            'type': 'medication',
            'min': 0,
            'sec': 0,
            'startTime': timeNow(),
            'interval': null,
            'running': true,
            'count': 1,
            'alert': {
                'min': alertTime.min,
                'sec': alertTime.sec
            },
            'doseAmount': item.dose,
            'doseUnit': item.unit,
            'route': item.route
        };
    }
    if (item.dataTag == "pulse") {
        $('#timer-container').append(`
        <div class="col s6 m4 l3 xl2">
            <div data="` + item.dataTag + `" id="` + item.dataTag + `-timer-card" class="card text-center timer-card" align="center">
                <span id="` + item.dataTag + `-count" class="card-title">count: 1</span>
                <div id="` + item.dataTag + `-timer-div" data="` + item.dataTag + `">
                    <div class="card-content center">
                        <h4 class="timer"><span id="` + item.dataTag + `-minutes">00</span>:<span id="` + item.dataTag + `-seconds">00</span></h4>
                    </div>
                    <div class="card-action center" id="` + item.dataTag + `-timer">
                        <span class="flow-text truncate timer-name">` + item.name + `</span>
                    </div>
                </div>
            </div>
            <script>
            $('#` + item.dataTag + `-timer-div').click(function () {
                $('#pulse-btn').click();
            });
            </script>
        </div>
            `);
        startTimer(timers[item.dataTag]);
    } else {
        $('#timer-container').append(`
        <div class="col s6 m4 l3 xl2">
            <div data="` + item.dataTag + `" id="` + item.dataTag + `-timer-card" class="card text-center timer-card modal-trigger" data-target="timer-confirm-modal" align="center">
                <span id="` + item.dataTag + `-count" class="card-title">count: 1</span>
                <div id="` + item.dataTag + `-timer-div" data="` + item.dataTag + `">
                    <div class="card-content center">
                        <h4 class="timer"><span id="` + item.dataTag + `-minutes">00</span>:<span id="` + item.dataTag + `-seconds">00</span></h4>
                    </div>
                    <div class="card-action center" id="` + item.dataTag + `-timer">
                        <span class="flow-text truncate timer-name">` + item.name + `</span>
                    </div>
                </div>
            </div>
        </div>
        <script>
        $('#` + item.dataTag + `-timer-div').click(function () {
            setTimerConfirmData("` + item.dataTag + `");
        });
        </script>
            `);
        startTimer(timers[item.dataTag]);
        initMaterial();
    }
}

function showDefibOptions() {
    if (defibOptionsVisible) {
        $('#defib-options-container').hide();
        defibOptionsVisible = false;
        $('#pulse-defib-btn').removeClass('red');
    } else {
        $('#defib-options-container').show();
        defibOptionsVisible = true;
        $('#pulse-defib-btn').addClass('red');
    }

    if (cardioOptionsVisible) {
        $('#cardio-options-container').hide();
        cardioOptionsVisible = false;
        $('#pulse-cardio-btn').removeClass('red');
    }
}

function showCardioOptions() {
    if (cardioOptionsVisible) {
        $('#cardio-options-container').hide();
        cardioOptionsVisible = false;
        $('#pulse-cardio-btn').removeClass('red');
    } else {
        $('#cardio-options-container').show();
        cardioOptionsVisible = true;
        $('#pulse-cardio-btn').addClass('red');
    }

    if (defibOptionsVisible) {
        $('#defib-options-container').hide();
        defibOptionsVisible = false;
        $('#pulse-defib-btn').removeClass('red');
    }
}