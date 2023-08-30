document.addEventListener("DOMContentLoaded", function () {
  const main = document.querySelector(".main");
  const sections = document.querySelectorAll(".section");

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

  const playButton = document.getElementById("playButton");
  const codeButton = document.getElementById("codeButton");
  const settingsButton = document.getElementById("settingsButton");

  playButton.addEventListener("click", function () {
    console.log("Play button clicked");
  });

  codeButton.addEventListener("click", function () {
    console.log("Code button clicked");
  });

  settingsButton.addEventListener("click", function () {
    console.log("Settings button clicked");
  });
});
