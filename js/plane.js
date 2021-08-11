//init object globally
var objImage = null;
var speed = null;

function init() {
  speed = document.querySelector("section.intro").style;
  objImage = document.getElementById("image1");
  objImage.style.position = "relative";
  objImage.style.left = "0px";
  objImage.style.top = "0px";
  setInterval(() => {
    if (parseInt(objImage.style.top) < 310) {
      objImage.style.top = parseInt(objImage.style.top) + 5 + "px";
    }
    if (parseInt(objImage.style.left) > -620) {
      objImage.style.left = parseInt(objImage.style.left) - 5 + "px";
    }
  }, 200);
  speed.animationDuration = "10s";
}

function getKeyAndMove(e) {
  var key_code = e.which || e.keyCode;
  var speed = document.querySelector("section.intro").style;
  switch (key_code) {
    case 37: //left arrow key
      moveLeft();
      if (parseFloat(speed.animationDuration) < 10) {
        speed.animationDuration = parseFloat(speed.animationDuration) + 0.01 + "s";
      }

      break;
    case 38: //Up arrow key
      moveUp();
      break;
    case 39: //right arrow key
      moveRight();
      if (parseFloat(speed.animationDuration) > 4) {
        speed.animationDuration = parseFloat(speed.animationDuration) - 0.01 + "s";
      }
      break;
    case 40: //down arrow key
      moveDown();
      break;
  }
}
function moveLeft() {
  if (parseInt(objImage.style.left) > -620) {
    objImage.style.left = parseInt(objImage.style.left) - 10 + "px";
  }
}
function moveUp() {
  objImage.style.top = parseInt(objImage.style.top) - 12 + "px";
}
function moveRight() {
  if (parseInt(objImage.style.left) < 400) {
    objImage.style.left = parseInt(objImage.style.left) + 12 + "px";
  }
}
function moveDown() {
  if (parseInt(objImage.style.top) < 310) {
    objImage.style.top = parseInt(objImage.style.top) + 10 + "px";
  }
}
window.onload = init;
