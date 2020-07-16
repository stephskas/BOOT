const canvas = document.getElementById('canvas');
/* Canvas API provides a meand for drawing graphics via JS and the HTML <canvas> element.
It can be used for animation, game graphics, data visualization, photo manipulation, and real-time video processing. The Canvas API largely focuses on 2D graphics. 
*/
const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;

// fillRect(x, y, width, height) - top left corner, width, height
// fillRect() 
// ctx.fillStyle = 'teal';
// ctx.fillRect(20, 20, 150, 100)
// ctx.fillStyle = 'limegreen';
// ctx.fillRect(200, 20, 150, 100);

// // strokeRect()
// ctx.lineWidth = 5;
// ctx.strokeStyle = 'lime';
// ctx.strokeRect(100, 200, 150, 100);

// // clearRect() - clearing top right rectangle
// ctx.clearRect(25, 25, 140, 90);

// // fillText() - uses last fill style
// ctx.font = '30px Arial';
// ctx.fillStyle = 'purple';
// ctx.fillText('Hello World', 400, 50);

// // strokeText
// ctx.lineWidth = 1;
// ctx.strokeStyle = 'orange';
// ctx.strokeText('Hello World', 400, 100);

// Paths - Triangle 
// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(100, 200);
// ctx.closePath();
// //ctx.lineTo(50, 50);
// // ctx.stroke();
// ctx.fillStyle = 'coral';
// ctx.fill();

// Paths - Inverse Triangle 
// ctx.beginPath()
// ctx.moveTo(200, 50);
// ctx.lineTo(150, 200);
// ctx.lineTo(250, 200);
// ctx.closePath();
// ctx.stroke();

// Rectangle
// ctx.beginPath();
// ctx.rect(300, 50, 150, 100);
// ctx.fillStyle = 'yellow';
// ctx.fill();

//arc( x,  y, radius, startAngle, endAngle, anticlockwise), full circle: 0 for startAngle, Math.Pi * 2, half-circle: 0 for startAngle, Math.Pi for endAngle // anticlockwise is a boolean value

// Arcs (circles)
// ctx.beginPath();

// const centerX = canvas.width / 2;
// const centerY = canvas.height / 2;

// // Draw head
// ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);

// // Move to mouth
// ctx.moveTo(centerX + 100, centerY);

// // Draw mouth
// ctx.arc(centerX, centerY, 100, 0, Math.PI, false); // false else will be upside-down

// // Move to left eye
// ctx.moveTo(centerX - 60, centerY - 80);

// // Draw left eye
// ctx.arc(centerX -80, centerY - 80, 20, 0, Math.PI * 2)

// // Move to right eye
// ctx.moveTo(centerX + 100, centerY - 80)

// // Draw right eye
// ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2)

// ctx.stroke();

// Quadratic curve
// ctx.moveTo(75, 25);
// ctx.quadraticCurveTo(25, 25, 25, 62.5);
// ctx.quadraticCurveTo(25, 100, 50, 100);
// ctx.quadraticCurveTo(50, 120, 30, 125);
// ctx.quadraticCurveTo(60, 120, 65, 100);
// ctx.quadraticCurveTo(125, 100, 125, 62.5);
// ctx.quadraticCurveTo(125, 25, 75, 25);
// ctx.stroke();

// Animation 1
// const circle = {
//   x: 200,
//   y: 200,
//   size: 30,
//   dx: 5,
//   dy: 4
// }

// function drawCircle() {
//   ctx.beginPath();
//   ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
//   ctx.fillStyle = 'green';
//   ctx.fill();
// }

// function update() {
//   ctx.clearRect(0,0, canvas.width, canvas.height);
//   drawCircle();

//   // change position
//   circle.x += circle.dx;
//   circle.y += circle.dy;

//   // detect side walls
//   if(circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
//     circle.dx *= -1;
//   }

//   // detect top and bottom walls
//   if (circle.y + circle.size > canvas.height|| circle.y - circle.size < 0) {
//     circle.dy *= -1;
//   }

//   requestAnimationFrame(update);
// }
// update();


// Animation 2 - Character

const image = document.getElementById('source');

const player = {
  w: 60,
  h: 80,
  x: 20,
  y: 200,
  speed: 5,
  dx: 1,
  dy: 0
}

function drawPlayer() {
  ctx.drawImage(image, player.x, player.y, player.w, player.h);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
  player.x += player.dx;
  player.y += player.dy;

  detectWalls();
}

function detectWalls() {
  // Left wall
  if(player.x < 0) {
    player.x = 0;
  }
  // Right wall
  if(player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w + 20;
  }
  // Top wall
  if(player.y < 0){
    player.y = 0;
  }
  // Bottom wall
  if(player.y + player.h > canvas.height){
    player.y = canvas.height - player.h + 20;
  }
}

function update() {
  clear();

  drawPlayer();

  newPos();

  requestAnimationFrame(update);
}

function moveUp() {
  player.dy = -player.speed;
}

function moveDown() {
  player.dy = player.speed;
}

function moveLeft() {
  player.dx = -player.speed;
}

function moveRight() {
  player.dx = player.speed;
}

function keyDown(e) {
  if (e.key === 'ArrowRight' || e.key === 'Right') {
    moveRight();
  } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
    moveLeft();
  } else if (e.key === 'ArrowUp' || e.key === 'Up') {
    moveUp()
  } else if (e.key === 'ArrowDown' || e.key === 'Down') {
    moveDown()
  }
}

function keyUp(e) {
  if (
    e.key === 'ArrowRight' || 
    e.key === 'Right' ||
    e.key === 'ArrowLeft' || 
    e.key === 'Left' ||
    e.key === 'ArrowUp' || 
    e.key === 'Up' ||
    e.key === 'ArrowDown' || 
    e.key === 'Down'
  ) {
    player.dx = 0;
    player.dy = 0;
  }
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyup);
