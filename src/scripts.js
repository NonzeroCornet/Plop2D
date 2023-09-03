function generateObjectId() {
  return Math.random().toString(36).substr(2, 9);
}
var hierarchyData;
document.addEventListener("DOMContentLoaded", function () {
  hierarchyData = {};
  let selectedObject = null;

  var main = document.querySelector(".main");
  var sections = document.querySelectorAll(".section");
  var gameHierarchy = document.getElementById("gameHierarchy");
  var hierarchyMenu = document.getElementById("contextMenu");

  // Create resizable panels using Split.js
  Split(sections, {
    sizes: [20, 50, 30, 20], // Initial sizes for each section (percentages)
    minSize: [100, 200, 100, 100], // Minimum sizes for each section
    gutterSize: 2, // Space between sections
  });

  Split([main, document.querySelector(".bottomSection")], {
    sizes: [80, 20], // Initial sizes for each section (percentages)
    minSize: [300, 100], // Minimum sizes for each section
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
    event.preventDefault(); // Prevent default context menu from appearing
    var x = event.clientX;
    var y = event.clientY;
    hierarchyMenu.style.display = "block";
    hierarchyMenu.style.left = x + "px";
    hierarchyMenu.style.top = y + "px";
  });

  document.addEventListener("click", function (event) {
    if (!hierarchyMenu.contains(event.target)) {
      hierarchyMenu.style.display = "none";
    }
  });

  function refreshHierarchyView() {
    gameHierarchy.innerHTML = "";
    createHierarchyView(null, gameHierarchy);
  }

  function createHierarchyView(parentId, container) {
    for (var objectId in hierarchyData) {
      if (!hierarchyData[objectId].parent && parentId === null) {
        var hierarchyItem = document.createElement("div");
        hierarchyItem.className = "hierarchy-item";
        hierarchyItem.textContent = `Object ID: ${hierarchyData[objectId].id}`;
        hierarchyItem.addEventListener("contextmenu", function (event) {
          event.preventDefault();
          showContextMenu(objectId, event.clientX, event.clientY);
        });

        container.appendChild(hierarchyItem);

        if (hierarchyData[objectId].children.length > 0) {
          var childContainer = document.createElement("div");
          childContainer.className = "child-container";
          hierarchyItem.appendChild(childContainer);

          createHierarchyView(objectId, childContainer);
        }
      } else if (
        hierarchyData[objectId].parent &&
        hierarchyData[objectId].parent.id === parentId
      ) {
        // Similar structure as above with context menu added
      }
    }
  }

  function showContextMenu(objectId, x, y) {
    var contextMenu = document.getElementById("contextMenu");
    contextMenu.style.display = "block";
    contextMenu.style.left = x + "px";
    contextMenu.style.top = y + "px";

    var addChildItem = document.getElementById("addChild");
    var moveUpItem = document.getElementById("moveUp");
    var moveDownItem = document.getElementById("moveDown");
    var nestItem = document.getElementById("nest");
    var removeItem = document.getElementById("remove");

    addChildItem.addEventListener("click", function () {
      console.log("pop");
      hierarchyData[objectId].children.push(generateObjectId());
      refreshHierarchyView();
      contextMenu.style.display = "none";
    });

    moveUpItem.addEventListener("click", function () {
      moveObjectUp(objectId);
      refreshHierarchyView();
      contextMenu.style.display = "none";
    });

    moveDownItem.addEventListener("click", function () {
      moveObjectDown(objectId);
      refreshHierarchyView();
      contextMenu.style.display = "none";
    });

    nestItem.addEventListener("click", function () {
      nestObject(objectId);
      refreshHierarchyView();
      contextMenu.style.display = "none";
    });

    removeItem.addEventListener("click", function () {
      removeObject(objectId);
      refreshHierarchyView();
      contextMenu.style.display = "none";
    });

    document.addEventListener("click", function (event) {
      if (!contextMenu.contains(event.target)) {
        contextMenu.style.display = "none";
      }
    });
  }
});
