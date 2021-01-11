var stream;
var ready = false;
console.log('in web worker')

onconnect = async function(e) {
    var port = e.ports[0];

    port.onmessage = async function(e) {  //message handler
        const command = e.data;
        console.log(command);
        switch (command) {
            case 'INIT_STREAM':
                await acquireVideoStream()
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

acquireVideoStream = async function() {
   WorkerNavigator.mediaDevices.getUserMedia({video: true})
        .then((s) => {
            stream = s
            ready = true;
            console.log("posting stream")
            port.postMessage(stream);
        });
    
}
// onconnect = function(e) {
//     var port = e.ports[0];
  
//     port.onmessage = function(e) {
//       var workerResult = 'Resullt: ' + (e.data[0] * e.data[1]);
//       port.postMessage(workerResult);
//     }
  
//   }

