var stream;

onConnect = function(e) {
    var port = e.ports[0];

    port.onMessage = function(e) {  //message handler
        const command = e.data[0];
        switch (command) {
            case 'INIT_STREAM':
                stream = navigator.mediaDevices.getUserMedia({video: true});
                console.log('video stream acquired. retrieve with GET_STREAM_OBJECT')
                break;
            case 'GET_STREAM_OBJECT':
                port.postMessage(stream);
                console.log('returned a video stream object');
                break;
            case 'TERMINATE':
                console.log('not yet implemented');
                break;
            default:
                console.log("didn't understand that command.");
        }
    }
}