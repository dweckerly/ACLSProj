var codeTimer = {
    'min': 0,
    'sec': 0
}

$(document).ready(function() {
    timerCode = setInterval(function() {
        timerDisplay('code', codeTimer);
    }, 1000);
});

// modal selection
$('#add-link').click(function () {
    if($('#operation-select').val() == 'Medication') {
        $('#med-modal').modal();
    } else if($('#operation-select').val() == 'Airway'){
        $('#airway-modal').modal();
    }
});

$('.med-submit-btn').click(function () {
    var id = $(this).attr('data');
    var name = $('#' + id + '-btn').text();
    var dose = $('#' + id + '-dose').val();
    var freq = $('#' + id + '-freq').val();
    var route = $('#' + id + '-route').val();

    $('#timer-container').append(
        "<div class='card med-timer-card'><div id='" + name + "-header' class='card-header'>" + name + "</div><div class='card-body'><h5 id='" + name +"-title' class='card-title'>" + freq + "</h5><p id='" + name + "-text' class='card-text'>" + dose + " "+ route +"</p></div></div>"
    )

    $('#med-modal').modal('hide');
});


// main timer function
function timerDisplay(id, arr) {
    arr['sec']++;
    if(arr['sec'] == 60) {
        arr['sec'] = 0;
        arr['min']++;
        if(arr['min'] == 60) {
            arr['min'] = 0;
        } 
        if(arr['min'] < 10) {
            $('#' + id + '-minutes').html('0' + arr['min']);
        } else {
            $('#' + id + '-minutes').html(arr['min']);
        }
    }
    if(arr['sec'] < 10) {
        $('#' + id + '-seconds').html('0' + arr['sec']);
    } else {
        $('#' + id + '-seconds').html(arr['sec']);
    }
}