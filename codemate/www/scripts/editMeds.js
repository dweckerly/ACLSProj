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
    let name = $('#new-med-name').val();
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
        var newMed = {
            name: name,
            dataTag: name + '-' + route,
            dose: createDoseArray(min, max, inc),
            unit: unit,
            route: route,
            type: "alert"
        }
        var newMeds = JSON.parse(localStorage.getItem('New_Medications'));
        medications = JSON.parse(localStorage.getItem('defaultMedications'));
        if (newMeds == null) {
            var newMedArray = [];
            newMedArray.push(newMed);
            localStorage.setItem('New_Medications', JSON.stringify(newMedArray));
            medications = medications.concat(JSON.parse(localStorage.getItem('New_Medications')));
        } else {
            newMeds.push(newMed);
            localStorage.setItem('New_Medications', JSON.stringify(newMeds));
            medications = medications.concat(JSON.parse(localStorage.getItem('New_Medications')));
        }
        returnToAddNewMedication();
    }
});