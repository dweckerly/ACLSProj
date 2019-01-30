$('#code-term').click(() => {
    saveCode();
});

function saveCode() {
    console.log(codeHistory);
    codeHistory.push(actions);
    console.log(codeHistory);
    localStorage.setItem('Code_History', JSON.stringify(codeHistory));
}