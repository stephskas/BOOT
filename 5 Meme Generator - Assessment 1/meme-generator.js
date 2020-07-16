document.addEventListener('DOMContentLoaded', () => {
function textChangeListener(e) {
  e.preventDefault()
  var id = e.target.id;
  var text = e.target.value;

  if (id == "topText") {
    window.topText = text;
  } else if (id == "bottomText")  {
    window.bottomText = text;
  }
  drawMeme(window.imageSrc, window.topText, window.bottomText);
}

function drawMeme(image, topText, bottomText) {
  // Get Canvas2DContext
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  if (image != null) {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
  // clear previous
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (image != null) {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
  // Text attributes
  ctx.font = '30pt Impact';
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'white';

  if (topText != null) {
    ctx.fillText(topText, canvas.width / 2, 40);
    ctx.strokeText(topText, canvas.width / 2, 40);
  }

  if (bottomText != null) {
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  }
}

function saveFile(e) {
  e.preventDefault()
  var saveBtn = document.querySelector('#saveBtn')
  saveBtn.addEventListener('click', function(e) {
    var link = document.createElement('a');
    link.innerHTML="DOWNLOAD REP";
    link.href = canvastoDataURL();
    link.download = "myRep.png";
  }, false);
    link.className = "myRepLink"
  let displayLink =  document.querySelector("#download")
  displayLink.appendChild(link);
}

function handleFileSelect(e) {
  //make canvas
  var canvasWidth = 500;
  var canvasHeight = 500;
  var file = e.target.files[0];

  //image upload
  var reader = new FileReader();
  reader.onload = function (fileObject) {
    var data = fileObject.target.result;

    // Create an image object
    var image = new Image();
    image.onload = function () {

      window.imageSrc = this;
      drawMeme(window.imageSrc, null, null);
    }

    // Set image data to background image.
    image.src = data;
    console.log(fileObject.target.result);
  };
  reader.readAsDataURL(file)
}
// window.imageSRC = null;
window.topText = "";
window.bottomText = "";
// window.imageSRC = null;
// window.topText = null;
// window.bottomText = null;

let file = document.querySelector("#fileInput");
file.onchange = handleFileSelect;

let inputTop = document.getElementById('topText');
let inputBottom = document.getElementById('bottomText');
inputTop.oninput = textChangeListener;
inputBottom.oninput = textChangeListener;
document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.querySelector('#repBtn').addEventListener('click', textChangeListener);
})