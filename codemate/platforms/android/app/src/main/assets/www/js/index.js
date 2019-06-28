var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        document.addEventListener("backbutton", function(e) {
            e.preventDefault();
        }, false);
        window.open = cordova.InAppBrowser.open;
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        let options = {
            documentSize: 'A4',
            type: 'base64'
        }
    }
};

app.initialize();