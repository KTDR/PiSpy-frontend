//https://www.tutorialspoint.com/html5/html5_websocket.htm#:~:text=Once%20you%20get%20a%20Web%20Socket%20connection%20with,object.%20var%20Socket%20%3D%20new%20WebSocket%20%28url%2C%20%5Bprotocal%5D%29%3B
var ws;

function webSocketEstablish() {
    var wsPath = 'wss://' + window.location.host
    ws = new WebSocket(wsPath);
    alert('Websocket established to ' + wsPath);

    ws.onOpen = function() {
        alert("Connected.");
    }
}
function webSocketTest(text) {
        ws.send(text);
        alert("Sent mesage to the server!");
    
}
function enableWSNotifications() {
    ws.onmessage = function (evt){
        alert("Received message from server: " + evt.data );
    }
}