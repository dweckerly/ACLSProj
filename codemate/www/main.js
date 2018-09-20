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
    });
});

$('#main-info-btn').click(() => {
    populateCodeInfo();
    $('#code-info-modal').modal();
});

$('#end-btn').click(() => {
    console.log(actions);
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

function getElapsedTime() {
    // will use this to add hours field for elapsed time
}

function populateReport() {
    $('#report-table-body').remove();
    $('#report-table').append(`<tbody id="report-table-body">
    </tbody>`)
    $('#code-start').html("Code Started: " + actions[0].time);
    $('#elapsed-time').html("Elapsed time: " + timers.code.min + ":" + timers.code.sec);
    for (let i = 0; i < actions.length; i++) {
        for (let j = 0; j < medications.length; j++) {
            if (actions[i].tag == medications[j].dataTag) {
                $('#report-table-body').append(`
                        <tr>
                            <td>` + actions[i].name + `</td>
                            <td>` + medications[j].doseAmount + ` ` + medications[j].doseUnit + ` ` + medications[j].route + `</td>
                            <td>` + actions[i].time + `</td>
                        </tr>`);;
            }
        }
        for (let j = 0; j < procedures.length; j++) {
            if (actions[i].tag == procedures[j].dataTag) {
                $('#report-table-body').append(`
                    <tr>
                        <td>` + actions[i].name + `</td>
                        <td>` + procedures[j].details + `</td>
                        <td>` + actions[i].time + `</td>
                    </tr>`);
            }
        }
    }
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
                        <td>` + procedures[j].details + `</td>
                        <td>` + actions[i].time + `</td>
                    </tr>`);
            }
        }
    }
}

function populateMedicationModal() {
    for (let i = 0; i < medications.length; i++) {
        $('#med-btn-container').append(
            "<button data-type='" + medications[i].type + "' data-tag='" + medications[i].dataTag + "' class='btn btn-outline-secondary med-btn modal-close'>" + medications[i].name + "</button>"
        );
    }
}

function populateProcedureModal() {
    for (let i = 0; i < procedures.length; i++) {
        $('#proc-btn-container').append(
            "<button data-type='" + procedures[i].type + "' data-tag='" + procedures[i].dataTag + "' class='btn btn-outline-secondary proc-btn modal-close'>" + procedures[i].name + "</button>"
        );
    }
}

populateMedicationModal();
populateProcedureModal();

$('#medications-btn').click(function() {
    $('#medication-modal').modal();
});

$('#procedures-btn').click(function() {
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
            actions.push({ 'name': name, 'tag': tag, 'action': 'pressed', 'time': timeNow() });
            callToast(name);
        }
    }
});

$('.proc-btn').click(function() {
    var type = $(this).attr('data-type');
    var tag = $(this).attr('data-tag');
    var name = $(this).html();
    if (tag in timers) {
        restartTimer(timers[tag]);
    } else {
        if (type == "timer") {
            createTimer(tag, 'procedure');
        }
        if (type == "alert") {
            actions.push({ 'name': name, 'tag': tag, 'action': 'pressed', 'time': timeNow() });
            callToast(name);
        }
    }
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
    restartTimer(timers[id]);
});
$('.info-btn').click(function() {
    var tag = $(this).attr('data');
    var type = $(this).attr('data-type');

    $('#info-name').html(timers[tag]['name']);
    if (type == 'medication') {
        $('#proc-info').hide();
        $('#med-info').show();
        $('#med-dose').html("Dose: " + timers[tag]['doseAmount'] + " " + timers[tag]['doseUnit']);
        $('#med-route').html("Route: " + timers[tag]['route']);
    } else if (type == 'procedure') {
        $('#med-info').hide();
        $('#proc-info').show();
        $('#proc-details').html(timers[tag]['details']);
    }
    $('#count').html("Total: " + timers[tag]['count']);
    $('#info-table-body').empty();
    for(i = 0; i < actions.length; i++) {
        if(actions[i]['tag'] == tag) {
            $('#info-table-body').append("<tr><td>" + actions[i]['action'] + "</td><td>" + actions[i]['time'] + "</td></tr>");
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