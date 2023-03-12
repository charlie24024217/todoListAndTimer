let list = document.querySelector("#list");

//讓清單可以折疊(待修正)
// let listStatus = "fold";
// list.addEventListener("click", () => {
//   switchListDisplay();
// });

// function switchListDisplay() {
//   if (window.innerWidth > 1200) {
//     if (listStatus == "open") {
//       $("#list").css("position", "fixed");
//       $("#list").css("right", -360 + "px");
//       listStatus = "fold";
//     } else {
//       $("#list").css("position", "relative");
//       $("#list").css("right", 0);
//       listStatus = "open";
//     }
//   } else if (window.innerWidth > 600 && window.innerWidth < 1200) {
//     if (listStatus == "open") {
//       $("#list").css("position", "fixed");
//       $("#list").css("right", -360 + "px");
//       listStatus = "fold";
//     } else {
//       $("#list").css("position", "absolute");
//       $("#list").css("right", 50);
//       listStatus = "open";
//     }
//   } else {
//     if (listStatus == "open") {
//       $("#list").css("bottom", -500 + "px");
//       listStatus = "fold";
//     } else {
//       $("#list").css("bottom", 10 + "%");
//       listStatus = "open";
//     }
//   }
// }

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

setItemBt(checkBt, startBt, trashBt);

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
}

statusCheckBox.addEventListener("click", (e) => {
  moveDone2(e);
});
