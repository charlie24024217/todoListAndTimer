let list = document.querySelector("#list");
let player = document.getElementById("player");
let counter;
let setTime;
let targetTime;
let remainTime = 25 * 60;
let timeText = document.getElementById("timeText");
function renderTime() {
  let min = Math.floor(remainTime / 60)
    .toString()
    .padStart(2, "0");
  let sec = Math.floor(remainTime % 60)
    .toString()
    .padStart(2, "0");
  timeText.innerHTML = `${min}:${sec}`;
}
renderTime();

function checkTime() {
  let currentTime = new Date().getTime();
  let diffsec = Math.round((currentTime - setTime) / 1000);
  remainTime = targetTime - diffsec;

  if (remainTime > 0) {
    renderTime();
  } else {
    clearInterval(counter);
    remainTime = 25 * 60;
  }
}

let playBt = document.getElementById("playBt");
let pauseBt = document.getElementById("pauseBt");
let stopBt = document.getElementById("stopBt");

playBt.addEventListener("click", () => {
  setTime = new Date().getTime();
  targetTime = remainTime;
  counter = setInterval(() => {
    checkTime();
  }, 1000);

  playBt.style.display = "none";
  pauseBt.style.display = "block";
  stopBt.style.display = "block";
});

pauseBt.addEventListener("click", () => {
  clearInterval(counter);

  pauseBt.style.display = "none";
  playBt.style.display = "block";
});

stopBt.addEventListener("click", () => {
  clearInterval(counter);
  if (
    target.querySelector(".item").querySelector(".text").innerText == "休息時間"
  ) {
    remainTime = 25 * 60;
    target.querySelector(".item").querySelector(".text").innerText =
      "選擇新目標";
    player.style.display = "none";
  } else {
    remainTime = 25 * 60;
    // target.querySelector(".item").querySelector(".text").innerText = "休息時間";
    // statusCheckBox.style.display = "none";
  }
  renderTime();

  playBt.style.display = "block";
  pauseBt.style.display = "none";
  stopBt.style.display = "none";
});

//讓清單可以折疊(待修正)
let listClose = document.getElementById("listClose");
let listStatus = "open";
listClose.addEventListener("click", () => {
  switchListDisplay();
});

function switchListDisplay() {
  if (window.innerWidth > 1200) {
    if (listStatus == "open") {
      $("#list").css("position", "fixed");
      $("#list").css("right", -500 + "px");
      listStatus = "fold";
      listClose.style.transform = "rotate(180deg)";
    } else {
      $("#list").css("position", "relative");
      $("#list").css("right", 4 + "vw");
      listStatus = "open";
      listClose.style.transform = "rotate(0)";
    }
  } else if (window.innerWidth > 600 && window.innerWidth < 1200) {
    if (listStatus == "open") {
      $("#list").css("position", "fixed");
      $("#list").css("right", -90 + "vw");
      listStatus = "fold";
      listClose.style.transform = "rotate(180deg)";
    } else {
      $("#list").css("position", "absolute");
      $("#list").css("right", 30);
      listStatus = "open";
      listClose.style.transform = "rotate(0)";
    }
  } else {
    if (listStatus == "open") {
      $("#list").css("bottom", -100 + "vh");
      listStatus = "fold";
      listClose.style.transform = "rotate(-90deg)";
    } else {
      $("#list").css("bottom", 16 + "%");
      listStatus = "open";
      listClose.style.transform = "rotate(90deg)";
    }
  }
}

//清單切換
let switchBt = document.getElementById("switchBt");
let todoListPage = document.getElementById("todoListPage");
let doneListPage = document.getElementById("doneListPage");

switchBt.addEventListener("click", () => {
  switchList();
});

function switchList() {
  if (getComputedStyle(todoListPage).display == "flex") {
    switchBt.children[0].style.color = "rgb(235, 185, 7)";
    todoListPage.style.display = "none";
    doneListPage.style.display = "flex";
  } else {
    switchBt.children[0].style.color = "rgb(235, 94, 7)";
    todoListPage.style.display = "flex";
    doneListPage.style.display = "none";
  }
}

//完成事項
let itemList = document.querySelector(".itemList");
let doneItemList = document.getElementById("doneItemList");
let checkBt = document.querySelector(".checkBt");
let startBt = document.querySelector(".startBt");
let trashBt = document.querySelector(".trashBt");
let target = document.getElementById("targetBox");
let statusCheckBox = target.querySelector("#statusCheckBox");

function moveToDo(e) {
  //將事項移至ToDoList，並移除DoneList的事項
  let newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.innerHTML = `<button class="checkBt">
              <i class="bi bi-circle"></i>
            </button>
            <div class="itemBox">
              <span class="text">${e.querySelector(".text").innerText}</span>
              <div class="textBts">
                <button class="startBt">
                  <i class="bi bi-play-fill"></i>
                </button>
                <button class="trashBt">
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>`;
  let checkBt = newItem.querySelector(".checkBt");
  let startBt = newItem.querySelector(".startBt");
  let trashBt = newItem.querySelector(".trashBt");
  setItemBt(checkBt, startBt, trashBt);
  itemList.appendChild(newItem);

  e.remove();
}

function moveDone(e) {
  //將事項移至DoneList，並移除ToDoList的事項
  let newDoneItem = document.createElement("div");
  newDoneItem.classList.add("item");
  newDoneItem.innerHTML = `<button class="checkBt">
  <i class="bi bi-check-circle"></i>
</button>
<div class="itemBox">
  <span class="text">${
    e.target.parentElement.parentElement.querySelector(".text").innerText
  }</span></div>`;
  doneItemList.appendChild(newDoneItem);
  let checkBt = newDoneItem.querySelector(".checkBt");
  checkBt.addEventListener("click", (e) => {
    moveToDo(e.target.parentElement.parentElement);
  });

  e.target.parentElement.parentElement.remove();
}

function moveDone2(e) {
  //將事項移至DoneList，並移除target的事項
  let newDoneItem = document.createElement("div");
  newDoneItem.classList.add("item");
  newDoneItem.innerHTML = `<button class="checkBt">
  <i class="bi bi-check-circle"></i>
</button>
<div class="itemBox">
  <span class="text">${
    e.target.parentElement.parentElement.querySelector(".text").innerText
  }</span></div>`;
  doneItemList.appendChild(newDoneItem);
  let checkBt = newDoneItem.querySelector(".checkBt");
  checkBt.addEventListener("click", (e) => {
    moveToDo(e.target.parentElement.parentElement);
  });

  e.target.parentElement.parentElement.querySelector(".text").innerText =
    "休息時間";
  e.target.parentElement.style.display = "none";
}

function sendToTarget(e) {
  checkTargetBox(e);

  e.target.parentElement.parentElement.parentElement.parentElement.remove();
}

function setItemBt(checkBt, startBt, trashBt) {
  checkBt.addEventListener("click", (e) => {
    moveDone(e);
  });
  startBt.addEventListener("click", (e) => {
    sendToTarget(e);
  });
  trashBt.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.parentElement.parentElement.remove();
  });
}

//新增事項
let addNewItemStatus = "off";
let addBt = document.getElementById("addBt");
let cancelBt = document.getElementById("cancelBt");
let newItemBox = document.getElementById("newItemBox");
let addNewItemInput = document.getElementById("addNewItemInput");

function checkAddItemBox() {
  if (addNewItemStatus == "off") {
    addBt.innerHTML = "<i class='bi bi-arrow-up-circle'></i>";
    newItemBox.style.display = "flex";
    addNewItemStatus = "on";
  } else {
    addBt.innerHTML = "<i class='bi bi-plus-circle-fill'></i>";
    newItemBox.style.display = "none";
    addNewItemStatus = "off";
  }
}

function addNewItem() {
  let newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.innerHTML = `<button class="checkBt">
              <i class="bi bi-circle"></i>
            </button>
            <div class="itemBox">
              <span class="text">${addNewItemInput.value}</span>
              <div class="textBts">
                <button class="startBt">
                  <i class="bi bi-play-fill"></i>
                </button>
                <button class="trashBt">
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>`;
  let checkBt = newItem.querySelector(".checkBt");
  let startBt = newItem.querySelector(".startBt");
  let trashBt = newItem.querySelector(".trashBt");
  setItemBt(checkBt, startBt, trashBt);

  itemList.appendChild(newItem);
}

addBt.addEventListener("click", () => {
  checkAddItemBox();
  if (addNewItemInput.value != "") {
    addNewItem();
  }
  addNewItemInput.value = "";
});

cancelBt.addEventListener("click", () => {
  checkAddItemBox();
  addNewItemInput.value = "";
});

function checkTargetBox(e) {
  let text = target.querySelector(".item").querySelector(".text");
  if (text.innerText !== "選擇新目標" && text.innerText !== "休息時間") {
    moveToDo(target.querySelector(".item"));
    let newTarget = document.createElement("div");
    newTarget.classList.add("item");
    newTarget.innerHTML = `<span class="text">${
      e.target.parentElement.parentElement.parentElement.querySelector(".text")
        .innerText
    }</span>`;
    target.appendChild(newTarget);
  } else {
    text.innerText =
      e.target.parentElement.parentElement.parentElement.querySelector(
        ".text"
      ).innerText;
  }
  statusCheckBox.style.display = "block";
  player.style.display = "flex";
}

statusCheckBox.addEventListener("click", (e) => {
  moveDone2(e);
  playBt.style.display = "block";
  pauseBt.style.display = "none";
  stopBt.style.display = "none";
  clearInterval(counter);
  remainTime = 5 * 60;
  renderTime();
});

let initList = ["完成番茄鐘", "報名培訓營", "遛狗"];
function addNewItemInit(i) {
  let newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.innerHTML = `<button class="checkBt">
              <i class="bi bi-circle"></i>
            </button>
            <div class="itemBox">
              <span class="text">${initList[i]}</span>
              <div class="textBts">
                <button class="startBt">
                  <i class="bi bi-play-fill"></i>
                </button>
                <button class="trashBt">
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>`;
  let checkBt = newItem.querySelector(".checkBt");
  let startBt = newItem.querySelector(".startBt");
  let trashBt = newItem.querySelector(".trashBt");
  setItemBt(checkBt, startBt, trashBt);

  itemList.appendChild(newItem);
}
for (let i = 0; i < initList.length; i++) {
  addNewItemInit(i);
}
