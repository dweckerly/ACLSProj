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

function populateProcedureList() {

}

function populateHistory() {
    if (codeHistory.length > 0) {
        for (var i = 0; i < codeHistory.length; i++) {
            $('#history-container').append(`
                <button class="edit-med waves-effect waves-light btn" onclick="viewHistory(` + i + `)">` + +`</button>
            `);
        }
    } else {
        $('#history-container').append(`
            <h4 class="center">No history found</h4>
        `);
    }
}

function viewHistory(index) {

}

function editMedication(key) {
    editing = true;
    editKey = key;
    $('#new-med-list').fadeOut();
    populateEditMedication();
    $('#add-med-btn').fadeOut(() => {
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
}

$('#add-new-med-btn').click(() => {
    $('#main-nav').fadeOut();
    $('#start-container').fadeOut(function() {
        populateEditMedList();
        populateHistory();
        populateProcedureList();
        $('#new-med-form').hide();
        $('#med-edit').fadeIn();
        $('#main-nav').fadeIn();
    });
});

$('#add-med-btn').click(() => {
    $('#new-med-list').fadeOut();
    $('#add-med-btn').fadeOut(() => {
        $('#new-med-form').fadeIn();
    });
});

$('#new-med-cancel-btn').click(() => {
    editing = false;
    returnToAddNewMedication();
});

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
            medications = JSON.parse(localStorage.getItem('defaultMedications'));
            if (JSON.parse(localStorage.getItem('New_Medications')) == null) {
                var newMedArray = [];
                newMedArray.push(newMed);
                localStorage.setItem('New_Medications', JSON.stringify(newMedArray));
                medications = medications.concat(JSON.parse(localStorage.getItem('New_Medications')));
            } else {
                var newMeds = JSON.parse(localStorage.getItem('New_Medications'));
                newMeds.push(newMed);
                localStorage.setItem('New_Medications', JSON.stringify(newMeds));
                medications = medications.concat(JSON.parse(localStorage.getItem('New_Medications')));
                console.log(medications);
            }
        }

        returnToAddNewMedication();
    }
});