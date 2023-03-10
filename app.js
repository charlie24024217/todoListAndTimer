let list = document.querySelector("#list");
let listStatus = "fold";
list.addEventListener("click", () => {
  switchDisplay();
});

function switchDisplay() {
  if (window.innerWidth > 1200) {
    if (listStatus == "open") {
      $("#list").css("position", "fixed");
      $("#list").css("right", -360 + "px");
      listStatus = "fold";
    } else {
      $("#list").css("position", "relative");
      $("#list").css("right", 0);
      listStatus = "open";
    }
  } else if (window.innerWidth > 600 && window.innerWidth < 1200) {
    if (listStatus == "open") {
      $("#list").css("position", "fixed");
      $("#list").css("right", -360 + "px");
      listStatus = "fold";
    } else {
      $("#list").css("position", "absolute");
      $("#list").css("right", 50);
      listStatus = "open";
    }
  } else {
    if (listStatus == "open") {
      $("#list").css("bottom", -500 + "px");
      listStatus = "fold";
    } else {
      $("#list").css("bottom", 10 + "%");
      listStatus = "open";
    }
  }
}
