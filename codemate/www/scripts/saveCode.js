$('#code-term').click(() => {
    $('#code-term-modal').modal();
});

function codeTerm(reason) {
    $('#code-term').hide();
    for (var member in timers) {
        clearInterval(timers[member].interval);
        delete timers[member];
    }
    actions.push({
        name: "End Code",
        desc: reason,
        time: timeNow()
    });
    saveCode(reason);
}

function saveCode(reason) {
    console.log(codeHistory);
    codeHistory.push({ name: reason + ": " + getDate(), actions: actions });
    console.log(codeHistory);
    localStorage.setItem('Code_History', JSON.stringify(codeHistory));
}