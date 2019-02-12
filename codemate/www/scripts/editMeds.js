var editing = false;
var editKey;

function populateEditMedList() {
    $('#new-med-list').empty();
    $(medications).each(function(key, value) {
        if (medications[key].route == 'drip') {
            var med = `<a class="edit-med btn-outline-secondary yellow lighten-3 drip btn" onclick="editMedication(` + key + `)">` + value.name + ` DRIP</a>`;
        } else {
            var med = `<a class="edit-med waves-effect waves-light btn" onclick="editMedication(` + key + `)">` + value.name + `</a>`
        }
        $('#new-med-list').append(med);
    });
}

function populateHistory() {
    $('#history-container').empty();
    if (codeHistory.length > 0) {
        for (var i = 0; i < codeHistory.length; i++) {
            $('#history-container').append(`
                <button class="history waves-effect waves-light btn" onclick="viewHistory(` + i + `)">` + codeHistory[i].name + `</button>
            `);
        }
    } else {
        $('#history-container').append(`
            <h4 class="center">No history found</h4>
        `);
    }
}

function viewHistory(index) {
    actions = codeHistory[index].actions;
    populateReport();
    $('#code-term').hide();
    $('#history-container').fadeOut(() => {
        $('#report-container').fadeIn();
        $('#report-footer').fadeIn();
    });
}

function editMedication(key) {
    editing = true;
    editKey = key;
    $('#new-med-list').fadeOut();
    populateEditMedication();
    $('#add-med-btn').fadeOut(() => {
        $('#new-med-delete-btn').show();
        $('#new-med-form').fadeIn();
    });
}

function populateEditMedication() {
    $('#new-med-name').val(medications[editKey].name);
    if (medications[editKey].route == "drip") {
        $('#drip-type').prop('checked', true);
        $('#ivp-type').prop('checked', false);
    } else {
        $('#drip-type').prop('checked', false);
        $('#ivp-type').prop('checked', true);
    }

    $('#new-med-min-dose').val(medications[editKey].dose[0]);
    $('#new-med-max-dose').val(medications[editKey].dose[medications[editKey].dose.length - 1]);
    if (medications[editKey].dose.length > 1) {
        $('#new-med-dose-inc').val(medications[editKey].dose[1] - medications[editKey].dose[0]);
    } else {
        $('#new-med-dose-inc').val(0);
    }
    $('#new-med-dose-unit').val(medications[editKey].unit);
    $('#name-label').addClass('active');
    $('#min-label').addClass('active');
    $('#max-label').addClass('active');
    $('#inc-label').addClass('active');
    $('#dose-label').addClass('active');
}

$('#add-new-med-btn').click(() => {
    $('#main-nav').fadeOut();
    $('#start-container').fadeOut(function() {
        populateEditMedList();
        populateHistory();
        populateNewProcList();
        $('#new-med-form').hide();
        $('#med-edit').fadeIn();
        $('#main-nav').fadeIn();
    });
});

$('#add-med-btn').click(() => {
    $('#new-med-list').fadeOut();
    clearNewMedForm();
    $('#new-med-delete-btn').hide();
    $('#add-med-btn').fadeOut(() => {
        $('#new-med-form').fadeIn();
    });
});

function deleteMedication() {
    medications.splice(editKey, 1);
    localStorage.setItem('Medications', JSON.stringify(medications));
    returnToAddNewMedication();
}

$('#new-med-cancel-btn').click(() => {
    editing = false;
    returnToAddNewMedication();
});

function clearNewMedForm() {
    editing = false;
    $('#new-med-name').val('');
    $('#drip-type').prop('checked', false);
    $('#ivp-type').prop('checked', true);
    $('#new-med-min-dose').val('');
    $('#new-med-max-dose').val('');
    $('#new-med-dose-inc').val('');
    $('#new-med-dose-unit').val('');
    $('#name-label').removeClass('active');
    $('#min-label').removeClass('active');
    $('#max-label').removeClass('active');
    $('#inc-label').removeClass('active');
    $('#dose-label').removeClass('active');
}

function returnToAddNewMedication() {
    $('#new-med-name').val('');
    $('#new-med-min-dose').val('');
    $('#new-med-max-dose').val('');
    $('#new-med-dose-inc').val('');
    $('#new-med-dose-unit').val('');
    $('#new-med-form').fadeOut(() => {
        populateEditMedList();
        $('#add-med-btn').fadeIn();
        $('#new-med-list').fadeIn();
    });
}

$('#new-med-save-btn').click(() => {
    var name = $('#new-med-name').val();
    let route;
    if ($('#ivp-type').prop('checked')) {
        route = "IVP";
    } else if ($('#drip-type').prop('checked')) {
        route = "drip";
    }
    let min = $('#new-med-min-dose').val();
    let max = $('#new-med-max-dose').val();
    let inc = $('#new-med-dose-inc').val();
    let unit = $('#new-med-dose-unit').val();

    var err = '';
    if (name.trim() == '' || min.trim() == '' || max.trim() == '' || inc.trim() == '' || unit.trim() == '') {
        err += "Please complete all fields before saving.";
    }
    if (err != '') {
        $('#new-med-form-message').html(err);
    } else {
        if (editing) {
            editing = false;
            medications[editKey].name = name;
            medications[editKey].dose = createDoseArray(min, max, inc);
            medications[editKey].unit = unit;
            medications[editKey].route = route;
        } else {
            let tag = name.replace(/\s/g, "") + '-' + route;
            var newMed = {
                name: name,
                dataTag: tag,
                dose: createDoseArray(min, max, inc),
                unit: unit,
                route: route,
                type: "alert"
            }
            medications.push(newMed);
        }
        localStorage.setItem('Medications', JSON.stringify(medications));
        returnToAddNewMedication();
    }
});

$('#edit-med-btn').click(() => {
    $('#med-proc-edit-container').fadeOut(() => {
        toEditMedList();
    });
});

function toEditMedList() {
    $('#add-med-btn').show();
    $('#new-med-list').show();
    $('#add-edit-med').fadeIn();
}