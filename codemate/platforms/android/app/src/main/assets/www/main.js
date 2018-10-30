$('#options-container').hide();

var editActionId;

document.addEventListener("backbutton", onBackKeyDown, false);

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
    });
});

$('#main-back-btn').click(() => {
    $('#back-confirm-modal').modal();
});

function onBackKeyDown() {}


$('#confirm-back-btn').click(() => {
    location.reload();
});

$('#end-btn').click(() => {
    populateReport();
    $('#main-nav').fadeOut();
    $('#options-container').fadeOut();
    $('#timer-container').fadeOut(() => {
        $('#report-container').fadeIn();
    });
});

$('#back-to-code').click(() => {
    $('#report-container').fadeOut(() => {
        $('#main-nav').fadeIn();
        $('#options-container').fadeIn();
        $('#timer-container').fadeIn();
    });
});

function populateReport() {
    $('#report-table-body').remove();
    $('#report-table').append(`<tbody id="report-table-body">
    </tbody>`)
    $('#code-start').html("Code Started: " + actions[0].time);
    $('#elapsed-time').html("Elapsed time: " + $('#main-minutes').html() + ":" + $('#main-seconds').html());
    for (let i = 0; i < actions.length; i++) {
        for (let j = 0; j < medications.length; j++) {
            if (actions[i].tag == medications[j].dataTag) {
                actions[i].desc = medications[j].doseAmount + ` ` + medications[j].doseUnit + ` ` + medications[j].route;
                $('#report-table-body').append(`
                    <tr class='report-row modal-trigger' data-target="report-modal" data='` + i + `'> 
                    <td> ` + actions[i].name + ` </td> 
                    <td class='truncate'> ` + actions[i].desc + ` </td> 
                    <td> ` + actions[i].time + ` </td> 
                    </tr>`);
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

function showReportDetails(id) {
    $('#report-action-name').val(actions[id].name);
    $('#report-action-time').val(actions[id].time);
    $('#report-action-description').val(actions[id].desc);
    editActionId = id;
    $('#report-modal').modal();
}

function populateCodeInfo() {
    $('.info-table-item').remove();
    for (let i = 0; i < actions.length; i++) {
        for (let j = 0; j < medications.length; j++) {
            if (actions[i].tag == medications[j].dataTag) {
                $('#code-info-table-body').append(`
                        <tr class="info-table-item">
                            <td>` + actions[i].name + `</td>
                            <td>` + medications[j].doseAmount + ` ` + medications[j].doseUnit + ` ` + medications[j].route + `</td>
                            <td>` + actions[i].time + `</td>
                        </tr>`);
            }
        }
        for (let j = 0; j < procedures.length; j++) {
            if (actions[i].tag == procedures[j].dataTag) {
                $('#code-info-table-body').append(`
                    <tr class="info-table-item">
                        <td>` + actions[i].name + `</td>
                        <td><span class="flow-text truncate">` + procedures[j].details + `</span></td>
                        <td>` + actions[i].time + `</td>
                    </tr>`);
            }
        }
    }
}

function populateMedicationModal() {
    for (let i = 0; i < medications.length; i++) {
        /*
        if (medications[i].dataTag == 'epi' || medications[i].dataTag == 'atro') {
            $('#quick-med-container').append(
                "<button data-type='" + medications[i].type + "' data-tag='" + medications[i].dataTag + "' class='btn btn-outline-secondary deep-purple lighten-3 modal-close'>" + medications[i].name + "</button>"
            )
        } else {
            $('#med-btn-container').append(
                "<button data-type='" + medications[i].type + "' data-tag='" + medications[i].dataTag + "' class='btn btn-outline-secondary med-btn modal-close'>" + medications[i].name + "</button>"
            );
        }*/
        $('#med-btn-container').append(
            "<button data-type='" + medications[i].type + "' data-tag='" + medications[i].dataTag + "' class='btn btn-outline-secondary med-btn modal-close'>" + medications[i].name + "</button>"
        );
    }
}

function populateProcedureModal() {
    for (let i = 0; i < procedures.length; i++) {
        if (procedures[i].dataTag == 'iv') {
            $('#proc-btn-container').append(`
            <button data-type='` + procedures[i].type + `' data-tag='` + procedures[i].dataTag + `' data-target='site-selection-modal' class='btn btn-outline-secondary proc-btn modal-trigger modal-close'>` + procedures[i].name + `</button>
            `);
        } else {
            $('#proc-btn-container').append(
                "<button data-type='" + procedures[i].type + "' data-tag='" + procedures[i].dataTag + "' class='btn btn-outline-secondary proc-btn modal-close'>" + procedures[i].name + "</button>"
            );
        }
    }
}

populateMedicationModal();
populateProcedureModal();

$('#medications-btn').click(function() {
    $('#med-search').val("");
    medModalSearch();
    $('#medication-modal').modal();
});

$('#procedures-btn').click(function() {
    $('#proc-search').val("");
    procModalSearch();
    $('#procedure-modal').modal();
});

$('.med-btn').click(function() {
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

$('.proc-btn').click(function() {
    var type = $(this).attr('data-type');
    var tag = $(this).attr('data-tag');
    var name = $(this).html();
    if (tag == 'iv') {
        showSiteOptions();
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
    let side = $('#site-select-side').val();
    let site = $('#site-select-site').val();
    var flag = false;
    if (side == null) {
        side = "";
        flag = true;
    }
    if (site == null) {
        site = "";
        flag = true;
    }
    actions.push({ 'name': 'IV', 'tag': 'iv', 'action': 'pressed', 'time': timeNow(), 'desc': "Site: " + side + " " + site, flag: flag });
    callToast('IV');
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
});

// will need new modal here to specify options
// also will add selection to action description when pushed
function showSiteOptions() {
    $('#site-selection-modal').modal();
}

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
    restartTimer(timers[id]);
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
    console.log("timer card " + id + " clicked!");
    restartTimer(timers[id]);
});