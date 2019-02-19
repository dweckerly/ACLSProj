$('#code-term').click(() => {
    $('#code-term-modal').modal();
});

function codeTerm(reason) {
    $('#code-term').hide();
    $('#print-report').show();
    $('#term-reason').html(reason);
    $('#term-reason').show();
    $('#elasped-time').html('Elasped time: ' + $('#main-minutes').html() + ":" + $('#main-seconds').html());
    for (var member in timers) {
        clearInterval(timers[member].interval);
        delete timers[member];
    }
    actions.push({
        name: "End Code",
        desc: reason,
        time: timeNow(),
        date: getDate()
    });
    actions.push({
        name: 'elasped time',
        desc: 'Elasped time: ' + $('#main-minutes').html() + ":" + $('#main-seconds').html()
    });
    saveCode(reason);
}

function saveCode(reason) {
    console.log(codeHistory);
    codeHistory.push({ name: reason.substring(0, 1) + ": " + getDate(), actions: actions });
    console.log(codeHistory);
    localStorage.setItem('Code_History', JSON.stringify(codeHistory));
}