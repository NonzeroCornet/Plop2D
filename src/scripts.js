document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    setTimeout(() => {
      document.querySelector("#loader").style.display = "none";
      document.querySelector("body").style.visibility = "visible";
    }, 100);
  }
};

function generateObjectId() {
  return Math.random().toString(36).substr(2, 9);
}
document.addEventListener("DOMContentLoaded", function () {
  var main = document.querySelector(".main");
  var sections = document.querySelectorAll(".section");
  var gameHierarchy = document.getElementById("gameHierarchy");
  var hierarchyMenu = document.getElementById("contextMenu");

  Split(sections, {
    sizes: [20, 50, 30, 20],
    minSize: [100, 200, 100, 100],
    gutterSize: 2,
  });

  Split([main, document.querySelector(".bottomSection")], {
    sizes: [80, 20],
    minSize: [300, 100],
    direction: "vertical",
    gutterSize: 2,
    snapOffset: 0,
  });

  var playButton = document.getElementById("playButton");
  var settingsButton = document.getElementById("settingsButton");

  playButton.addEventListener("click", function () {
    console.log("Play button clicked");
  });

  settingsButton.addEventListener("click", function () {
    console.log("Settings button clicked");
  });

  gameHierarchy.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    showContextMenu(event.clientX, event.clientY);
  });

  document.addEventListener("click", function (event) {
    if (!hierarchyMenu.contains(event.target)) {
      hierarchyMenu.style.display = "none";
    }
  });

  function showContextMenu(x, y) {
    var contextMenu = document.getElementById("contextMenu");
    contextMenu.style.display = "block";
    contextMenu.style.left = x + "px";
    contextMenu.style.top = y + "px";

    var createGameObject = document.getElementById("createGameObject");
    var removeItem = document.getElementById("remove");

    createGameObject.onclick = function () {
      let newId = generateObjectId();
      hierarchy[newId] = {
        parent: "root",
        compoments: {
          transform: [0, 0, 0, 1, 1],
        },
      };
      document.querySelector(".hierarchyul").innerHTML +=
        '<li class="hierarchyli" id="' +
        newId +
        '" onclick="selectGameObject(this)">GameObject</li>';
      contextMenu.style.display = "none";
      enableDragSort("drag-sort-enable");
    };

    removeItem.addEventListener("click", function () {
      document.getElementById(selectedGameObject)
        ? document.getElementById(selectedGameObject).remove()
        : null;
      selectedGameObject = "";
      contextMenu.style.display = "none";
    });

    document.addEventListener("click", function (event) {
      if (!contextMenu.contains(event.target)) {
        contextMenu.style.display = "none";
      }
    });
  }
});

var hierarchy = {};
var selectedGameObject = "";

function enableDragSort(listClass) {
  const sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, (list) => {
    enableDragList(list);
  });
}

function enableDragList(list) {
  Array.prototype.map.call(list.children, (item) => {
    enableDragItem(item);
  });
}

function enableDragItem(item) {
  item.setAttribute("draggable", true);
  item.ondrag = handleDrag;
  item.ondragend = handleDrop;
}

function handleDrag(item) {
  const selectedItem = item.target,
    list = selectedItem.parentNode,
    x = event.clientX,
    y = event.clientY;

  selectedItem.classList.add("drag-sort-active");
  let swapItem =
    document.elementFromPoint(x, y) === null
      ? selectedItem
      : document.elementFromPoint(x, y);

  if (list === swapItem.parentNode) {
    swapItem =
      swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    list.insertBefore(selectedItem, swapItem);
  }

  const dropX = event.clientX - list.getBoundingClientRect().left;
  selectedItem.style.marginLeft = Math.round(dropX / 50) * 50 + "px";
}

function handleDrop(event) {
  const selectedItem = event.target;
  selectedItem.classList.remove("drag-sort-active");

  const list = document.querySelector(".hierarchyul");
  const dropX = event.clientX - list.getBoundingClientRect().left;
  selectedItem.style.marginLeft = Math.round(dropX / 50) * 50 + "px";

  for (let i = 0; i < list.children.length; i++) {
    hierarchy[list.children[i].id].parent = "root";
    for (let x = i - 1; x >= -1; x--) {
      if (x != -1) {
        if (
          Number(list.children[x].style.marginLeft.split("px")[0]) <
          Number(list.children[i].style.marginLeft.split("px")[0])
        ) {
          hierarchy[list.children[i].id].parent = list.children[x].id;
          break;
        }
      } else {
        break;
      }
    }
  }
}

function selectGameObject(elem) {
  for (
    let i = 0;
    i < document.querySelector(".hierarchyul").children.length;
    i++
  ) {
    document.querySelector(".hierarchyul").children[i].style.background =
      "linear-gradient(to right, #b31217, #e52d27)";
  }
  elem.style.background = "linear-gradient(to right, #4cede8, #1ad2d8)";
  selectedGameObject = elem.id;
}

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey) {
    event.preventDefault();
  }
});
