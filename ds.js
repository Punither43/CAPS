// Select the video and canvas elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const displaySize = { width: video.width, height: video.height };

// Load face-api.js models from CDN
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

// Start the video stream using webcam
function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => video.srcObject = stream)
    .catch(err => console.error('Error accessing webcam:', err));
}

// Detect faces and draw on the canvas
video.addEventListener('play', () => {
  const canvasContext = canvas.getContext('2d');
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks().withFaceExpressions();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 100);
});
