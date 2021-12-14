//activating socket also on the server side
let clientSocket = io();
let angle = 0;
let colorInt1 = "#E56399";
let colorInt2 = "#7FD1B9";
let colorEst1 = "#DE6E4B";
let colorEst2 = "#7A6563";

clientSocket.on("connect", newConnection);
clientSocket.on("mouseBroadcast", newBroadcast);

function newConnection() {
  console.log(clientSocket.id);
}

function newBroadcast(data) {
  console.log(data);
  drawFlowers(data.x, data.y, data.ci, data.ce);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#E5D4CE");
  noStroke();
}

function draw() {
  drawFlowers(mouseX, mouseY, colorInt1, colorEst1);
}

//when i move the mouse, i send the information to the server which sends the info to the other clients
function mouseMoved() {
  let message = {
    x: mouseX,
    y: mouseY,
    ci: colorInt2,
    ce: colorEst2,
  };

  clientSocket.emit("mouse", message);
}

function drawFlowers(mX, mY, cI, cE) {
  // fill(c)
  angle += 5;
  let val = cos(radians(angle)) * 12.0;
  for (let a = 0; a < 360; a += 75) {
    let xoff = cos(radians(a)) * val;
    let yoff = sin(radians(a)) * val;
    // fill("#F2A35E");
    fill(cI);
    ellipse(mX + xoff, mY + yoff, val, val);
    fill(cE);
    ellipse(mX, mY, 2, 2);
  }
}
