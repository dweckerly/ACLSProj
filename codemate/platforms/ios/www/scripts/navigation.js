var currentPage = "start";

var pageMap = {};

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown(e) {
    e.preventDefault();
    /* save for later
    if (currentPage != "start") {
        e.preventDefault();
    }
    */
}