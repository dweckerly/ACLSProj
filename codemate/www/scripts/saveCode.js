$('#code-term').click(() => {
    codeTerm('test');
});

function codeTerm(reason) {
    for (var member in timers) {
        clearInterval(timers[member].interval);
        delete timers[member];
    }
    actions.push({
        name: "End Code",
        desc: reason,
        time: timeNow()
    });
    saveCode();
}

function saveCode() {
    console.log(codeHistory);
    codeHistory.push(actions);
    console.log(codeHistory);
    localStorage.setItem('Code_History', JSON.stringify(codeHistory));
}