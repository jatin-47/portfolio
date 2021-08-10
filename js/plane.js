//init object globally
var objImage = null;
function init() {
  objImage = document.getElementById("image1");
  objImage.style.position = "relative";
  objImage.style.left = "0px";
  objImage.style.top = "0px";
  setInterval(() => {
    if (parseInt(objImage.style.top) < 310) {
      objImage.style.top = parseInt(objImage.style.top) + 8 + "px";
    }
    if (parseInt(objImage.style.left) > -610) {
      objImage.style.left = parseInt(objImage.style.left) - 8 + "px";
    }
  }, 200);
}
function getKeyAndMove(e) {
  var key_code = e.which || e.keyCode;
  switch (key_code) {
    case 37: //left arrow key
      moveLeft();
      break;
    case 38: //Up arrow key
      moveUp();
      break;
    case 39: //right arrow key
      moveRight();
      break;
    case 40: //down arrow key
      moveDown();
      break;
  }
}
function moveLeft() {
  objImage.style.left = parseInt(objImage.style.left) - 10 + "px";
}
function moveUp() {
  objImage.style.top = parseInt(objImage.style.top) - 12 + "px";
}
function moveRight() {
  if (parseInt(objImage.style.top) < 500) {
    objImage.style.left = parseInt(objImage.style.left) + 12 + "px";
  }
}
function moveDown() {
  if (parseInt(objImage.style.top) < 310) {
    objImage.style.top = parseInt(objImage.style.top) + 10 + "px";
  }
}
window.onload = init;
