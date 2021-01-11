var videobox = document.getElementById('webcam-box');

if (window.SharedWorker) {
    var webcamWorker = new SharedWorker("/assets/js/webcam_worker.js");
}

function getWebcamStream() {
    webcamWorker.port.postMessage('GET_STREAM_OBJECT');
    console.log('message posted to worker')
}
function initializeWebcamStream() {
    webcamWorker.port.postMessage('INIT_STREAM');
    console.log('message posted to worker')
}
webcamWorker.port.onmessage = function(e) {
    if (e.data) {
        console.log('worker sent out this data ' + JSON.stringify(e.data));
        videobox.srcObject = e.data;
    }
}

