let count = 0;

function increase() {
  count = count + 1;
  update();
}

function decrease() {
  count = count - 1;
  update();
}

function update() {
  document.getElementById("count").innerText = count;

  if (count > 0) {
    document.body.style.backgroundColor = "#d4f8d4";
  } else if (count < 0) {
    document.body.style.backgroundColor = "#f8d4d4";
  } else {
    document.body.style.backgroundColor = "#f4f4f4";
  }
}
