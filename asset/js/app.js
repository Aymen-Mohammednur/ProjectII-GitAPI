function hide(element) {
  element.style.display = "none";
}

function show(element, value="block") {
  element.style.display = value;
}

function clearCards() {
  deckDOM.textContent = "";
}

function inputDetected(e, callback, button) {
  button.removeAttribute("disabled");
  var key = e.keyCode;
  const ENTER_KEY = 13;
  if (key === ENTER_KEY) {
    // enter pressed
    callback();
  }
}