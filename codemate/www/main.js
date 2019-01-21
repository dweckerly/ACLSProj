$('#options-container').hide();
$('#report-container').hide();

var editActionId;
var defibOptionsVisible = false;
var cardioOptionsVisible = false;

var oralSelect = false;
var nasalSelect = false;

document.addEventListener("backbutton", onBackKeyDown, false);

$(document).ready(function() {

});

$('#start-btn').click(function() {
    $('#logo-wrapper').hide();
    $('#code-timer-wrapper').show();
    populateMedicationModal();
    $('#start-container').fadeOut(function() {
        $('#options-container').fadeIn();
        startTimer(timers.code);
        $('#pulse-btn').click();
    });
});

$('#main-back-btn').click(() => {
    $('#back-confirm-modal').modal();
});

function onBackKeyDown() {}

function populateReport() {
    $('#report-table-body').remove();
    $('#report-table').append(`<tbody id="report-table-body">
    </tbody>`)
    $('#code-start').html("Code Started: " + actions[0].time);
    $('#elapsed-time').html("Elapsed time: " + $('#main-minutes').html() + ":" + $('#main-seconds').html());
    for (let i = 0; i < actions.length; i++) {
        for (let j = 0; j < medications.length; j++) {
            if (actions[i].tag == medications[j].dataTag) {
                if (actions[i].desc == "") {
                    actions[i].desc = medications[j].doseAmount + ` ` + medications[j].doseUnit + ` ` + medications[j].route;
                }
                if ('flag' in actions[i]) {
                    if (actions[i].flag) {
                        $('#report-table-body').append(`
                        <tr class='report-row modal-trigger' bgcolor="#f0e68c" data-target="report-modal" data='` + i + `'> 
                        <td> ` + actions[i].name + ` </td> 
                        <td class='truncate'> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`);
                    } else {
                        $('#report-table-body').append(`
                        <tr class='report-row modal-trigger' data-target="report-modal" data='` + i + `'> 
                        <td> ` + actions[i].name + ` </td> 
                        <td class='truncate'> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`);
                    }
                } else {
                    $('#report-table-body').append(`
                    <tr class='report-row modal-trigger' data-target="report-modal" data='` + i + `'> 
                    <td> ` + actions[i].name + ` </td> 
                    <td class='truncate'> ` + actions[i].desc + ` </td> 
                    <td> ` + actions[i].time + ` </td> 
                    </tr>`);
                }
            }
        }
        for (let j = 0; j < procedures.length; j++) {
            if (actions[i].tag == procedures[j].dataTag) {
                if (actions[i].desc == "") {
                    actions[i].desc = procedures[j].details;
                }
                if ('flag' in actions[i]) {
                    if (actions[i].flag) {
                        $('#report-table-body').append(`
                            <tr class='report-row modal-trigger' bgcolor="#f0e68c" data-target="report-modal" data='` + i + `'> 
                            <td> ` + actions[i].name + ` </td> 
                            <td class='truncate'> ` + actions[i].desc + ` </td> 
                            <td> ` + actions[i].time + ` </td> 
                            </tr>`);
                    } else {
                        $('#report-table-body').append(`
                        <tr class='report-row modal-trigger' data-target="report-modal" data='` + i + `'> 
                        <td> ` + actions[i].name + ` </td> 
                        <td class='truncate'> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`);
                    }
                } else {
                    $('#report-table-body').append(`
                        <tr class='report-row modal-trigger' data-target="report-modal" data='` + i + `'> 
                        <td> ` + actions[i].name + ` </td> 
                        <td class='truncate'> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`);
                }
            }
        }
    }
    $('#report-table-body').append(`<script>
        $('.report-row').click(function () {
            showReportDetails($(this).attr('data'));
        });
    </script>`);
}

function generatePDF() {
    var filename = "CodeMate_Report_" + getDate() + ".pdf";
    var options = {
        documentSize: 'A4',
        landscape: "portrait",
        type: "base64",
        fileName: filename
    };

    var pdfhtml = '<html><head><link rel="stylesheet" href="css/materialize.css"><link rel="stylesheet" href="main.css"></head><body>';

    pdfhtml += "<h3>Code Started: " + actions[0].time + "</h3>";
    pdfhtml += "<h3>Elapsed time: " + $('#main-minutes').html() + ":" + $('#main-seconds').html() + "</h3>";
    pdfhtml += `<table><tbody id="report-table-body">`;
    for (let i = 0; i < actions.length; i++) {
        for (let j = 0; j < medications.length; j++) {
            if (actions[i].tag == medications[j].dataTag) {
                if (actions[i].desc == "") {
                    actions[i].desc = medications[j].doseAmount + ` ` + medications[j].doseUnit + ` ` + medications[j].route;
                }
                if ('flag' in actions[i]) {
                    if (actions[i].flag) {
                        pdfhtml += `
                        <tr class='report-row' bgcolor="#f0e68c"> 
                        <td> ` + actions[i].name + ` </td> 
                        <td> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`;
                    } else {
                        pdfhtml += `
                        <tr class='report-row'> 
                        <td> ` + actions[i].name + ` </td> 
                        <td> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`;
                    }
                } else {
                    pdfhtml += `
                    <tr class='report-row'> 
                    <td> ` + actions[i].name + ` </td> 
                    <td> ` + actions[i].desc + ` </td> 
                    <td> ` + actions[i].time + ` </td> 
                    </tr>`;
                }
            }
        }
        for (let j = 0; j < procedures.length; j++) {
            if (actions[i].tag == procedures[j].dataTag) {
                if (actions[i].desc == "") {
                    actions[i].desc = procedures[j].details;
                }
                if ('flag' in actions[i]) {
                    if (actions[i].flag) {
                        pdfhtml += `
                            <tr class='report-row' bgcolor="#f0e68c"> 
                            <td> ` + actions[i].name + ` </td> 
                            <td class='truncate'> ` + actions[i].desc + ` </td> 
                            <td> ` + actions[i].time + ` </td> 
                            </tr>`;
                    } else {
                        pdfhtml += `
                        <tr class='report-row'> 
                        <td> ` + actions[i].name + ` </td> 
                        <td class='truncate'> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`;
                    }
                } else {
                    pdfhtml += `
                        <tr class='report-row'> 
                        <td> ` + actions[i].name + ` </td> 
                        <td class='truncate'> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`;
                }
            }
        }
    }

    pdfhtml += '</tbody></table></body></html>';
    pdf.fromData(pdfhtml, options)
        .then(function(base64) {
            // To define the type of the Blob
            var contentType = "application/pdf";

            // if cordova.file is not available use instead :
            // var folderpath = "file:///storage/emulated/0/Download/";
            var folderpath = cordova.file.externalRootDirectory + "Download/"; //you can select other folders
            savebase64AsPDF(folderpath, fileName, base64, contentType);
        })
        .catch((err) => console.err(err));
}

$('#save-report').click(() => {
    generatePDF();
});

function showReportDetails(id) {
    $('#report-action-name').val(actions[id].name);
    $('#report-action-time').val(actions[id].time);
    $('#report-action-description').val(actions[id].desc);
    editActionId = id;
    $('#report-modal').modal();
}

function populateMedicationModal() {
    for (let i = 0; i < medications.length; i++) {
        if (medications[i].route == 'drip') {
            $('#med-btn-container').append(`
            <button id="` + medications[i].dataTag + `-btn-label" data-tag="` + medications[i].dataTag + `" class='btn btn-outline-secondary yellow lighten-3 drip drop-med-btn med-btn'>` + medications[i].name + ` DRIP</button>
            <div class="collap-body" id="` + medications[i].dataTag + `-body">
                <div class="input-field col s6">
                    <select id="` + medications[i].dataTag + `-dose-select">
                        <option value="" disabled selected>Amount</option>
                        ` + returnDoseOptions(medications[i]) + `
                    </select>
                    <p id="` + medications[i].dataTag + `-unit">` + medications[i].unit + `</p>
                </div>
                <button data-tag="` + medications[i].dataTag + `" class="btn btn-outline-secondary med-btn-confirm modal-close purple lighten-2">Confirm</button>
            </div>
            `);
        } else if (medications[i].route == 'IVP') {
            $('#med-btn-container').append(`
            <button id="` + medications[i].dataTag + `-btn-label" data-tag="` + medications[i].dataTag + `" class='btn btn-outline-secondary drop-med-btn med-btn'>` + medications[i].name + `</button>
            <div class="collap-body" id="` + medications[i].dataTag + `-body">
                <div class="input-field col s6">
                    <select id="` + medications[i].dataTag + `-dose-select">
                        <option value="" disabled selected>Amount</option>
                        ` + returnDoseOptions(medications[i]) + `
                    </select>
                    <p id="` + medications[i].dataTag + `-unit">` + medications[i].unit + `</p>
                </div>
                <button data-tag="` + medications[i].dataTag + `" class="btn btn-outline-secondary med-btn-confirm modal-close purple lighten-2">Confirm</button>
            </div>
            `);
        } else {
            $('#med-btn-container').append(`
            <button data-type="` + medications[i].type + `" data-tag="` + medications[i].dataTag + `" class='btn btn-outline-secondary alert-med-btn med-btn modal-close'>` + medications[i].name + `</button>
            `);
        }
    }
    dropMeds();
    alertMeds()
    confirmMeds();
    initMaterial();
}

function returnDoseOptions(med) {
    let opts = "";
    med.dose.forEach(function(e) {
        opts += " <option value='" + e + "'>" + e + "</option> ";
    });
    return opts;
}

function populateProcedureModal() {
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
        showNasoOptions();
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

$('#select-site-confirm').click(() => {
    let size = $('#site-select-size').val();
    let side = $('#site-select-side').val();
    let site = $('#site-select-site').val();
    var flag = false;
    if (size == null) {
        size = "N/A";
        flag = true;
    }
    if (side == null) {
        side = "N/A";
        flag = true;
    }
    if (site == null) {
        site = "N/A";
        flag = true;
    }
    actions.push({ 'name': 'IV', 'tag': 'iv', 'action': 'pressed', 'time': timeNow(), 'desc': size + ", " + side + " " + site, flag: flag });
    callToast('IV');
});

$('#io-selection-confirm').click(() => {
    let size = $('#io-select-size').val();
    let side = $('#io-select-side').val();
    let site = $('#io-select-site').val();
    var flag = false;
    if (size == null) {
        size = "N/A";
        flag = true;
    }
    if (site == null) {
        site = "N/A";
        flag = true;
    }
    if (side == null) {
        side = "N/A";
        flag = true;
    }
    actions.push({ 'name': 'Interosseous', 'tag': 'interos', 'action': 'pressed', 'time': timeNow(), 'desc': size + ", " + side + " " + site, flag: flag });
    callToast('Interosseous');
});

$('#pulse-no-action').click(() => {
    $('#pulse-selection-confirm').click();
});

$('#pulse-selection-confirm').click(() => {
    var flag = false;
    if (cardioOptionsVisible) {
        if ($('#cardio-select-joules').val() == null) {
            var desc = "Sync. Cardioversion (?) joules";
        } else {
            var desc = "Sync. Cardioversion " + $('#cardio-select-joules').val() + " joules";
        }
    } else if (defibOptionsVisible) {
        if ($('#defib-select-joules').val() == null) {
            var desc = "Defibrillation (?) joules";
        } else {
            var desc = "Defibrillation " + $('#defib-select-joules').val() + " joules";
        }
    } else {
        var desc = "Check for pulse";
    }
    if ('pulse' in timers) {
        restartTimer(timers['pulse']);
    } else {
        createTimer("pulse", "procedure");
    }
    actions.push({ 'name': 'Pulse Check', 'tag': 'pulse', 'action': 'pressed', 'time': timeNow(), 'desc': desc, flag: flag });
    callToast('Pulse Check');
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
    actions.splice(editActionId, 1);
    populateReport();
    // need to check for count and decrement as necessary
});

// will need new modal here to specify options
// also will add selection to action description when pushed
function showSiteOptions() {
    $('#site-selection-modal').modal();
}

function showIOOptions() {
    $('#io-selection-modal').modal();
}

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

function showNasoOptions() {
    $('#naso-selection-modal').modal();
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
    var data, item, t;
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

    for (let i = 0; i < timersData.length; i++) {
        if (timersData[i].dataTag == item.dataTag) {
            t = timersData[i];
        }
    }

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
                'min': t.alertMin,
                'sec': t.alertSec
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
                'min': t.alertMin,
                'sec': t.alertSec
            },
            'doseAmount': item.doseAmount,
            'doseUnit': item.doseUnit,
            'route': item.route
        };
    }

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
        <a class="btn-floating btn-small halfway-fab waves-effect waves-light red info-btn modal-trigger" data-target="info-modal" data="` + item.dataTag + `" data-type="` + type + `"><i class="material-icons">info_outline</i></a>
    </div>
</div>
<script>
$('#` + item.dataTag + `-timer-div').click(function () {
    var id = $(this).attr('data');
    $('#` + item.dataTag + `-count').html("count: " + (timers[id].count + 1));
    if(id == 'pulse') {
        $('#pulse-btn').click();
    } else {
        restartTimer(timers[id]);
    }
});
$('.info-btn').click(function() {
    var tag = $(this).attr('data');
    var type = $(this).attr('data-type');
    var desc;
    $('#info-name').html(timers[tag]['name']);
    if (type == 'medication') {
        $('#proc-info').hide();
        $('#med-info').show();
        $('#med-dose').html("Dose: " + timers[tag]['doseAmount'] + " " + timers[tag]['doseUnit']);
        $('#med-route').html("Route: " + timers[tag]['route']);
        desc = timers[tag]['doseAmount'] + " " + timers[tag]['doseUnit'] + ' - ' + timers[tag]['route'];
    } else if (type == 'procedure') {
        $('#med-info').hide();
        $('#proc-info').show();
        $('#proc-details').html(timers[tag]['details']);
        desc = timers[tag]['details'];
    }
    $('#count').html("Total: " + timers[tag]['count']);
    $('#info-table-body').empty();
    for(i = 0; i < actions.length; i++) {
        if(actions[i]['tag'] == tag) {
            $('#info-table-body').append("<tr><td>" + actions[i]['action'] + "</td><td>" + desc + "</td><td>" + actions[i]['time'] + "</td></tr>");
        }
    }
    $('#info-modal').modal();
});
</script>
    `);
    startTimer(timers[item.dataTag]);
}

$('.timer-card').click(function() {
    var id = $(this).attr('data');
    restartTimer(timers[id]);
});

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