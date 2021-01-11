var videobox = document.getElementById('webcam-box');

if (!!window.SharedWorker) {
    var webcamWorker = new SharedWorker("webcam_worker.js");
}

function getWebcamStream() {
    webcamWorker.port.postMessage(['GET_STREAM']);

}

webcamWorker.port.onmessage = function(e) {
    videobox.srcObject = e[0];
}
