//https://www.tutorialspoint.com/html5/html5_websocket.htm

function webSocketTest(text = 'Message to send') {
    var ws = new WebSocket("ws://localhost:9998/echo");

    ws.onOpen = function() {
        ws.send(text);
        alert("Successfully sent mesage to the server!");
    }

    ws.onmessage = function (evt){
        alert("Received message from server: " + evt.data );

    }
}