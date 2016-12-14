/** -------------------------- MENU FUNCTIONALITY -------------------------- **/
// STREAMLINING DOM MANIPULATION
// END GAME STATE

var MENU_ENTITY = document.getElementById("menu");
var TEXT_LINE_0 = document.getElementById("text-line-0");
var TEXT_LINE_1 = document.getElementById("text-line-1");
var TEXT_LINE_2 = document.getElementById("text-line-2");
var TEXT_LINE_3 = document.getElementById("text-line-3");
var PROMPT = document.getElementById("prompt");
var PROMPT_TEXT = document.getElementById("prompt-text");
var PROMPT_CURSOR = document.getElementById("prompt-cursor");

var text_cursor_flash = flashAnimation(PROMPT_CURSOR, 500); // because REASONS

/* -------------------------------------------- STREAMLINING DOM MANIPULATION */
function bmfontTextSet(element, string) {
  var text = "text: > " + string;
  element.setAttribute("bmfont-text", text);
}

function toggleVisible(element) {
  element.setAttribute("visible", !element.getAttribute('visible'));
}

function flashAnimation(element, flash_pulse) {
  return setInterval(function() {
    toggleVisible(element);
  }, flash_pulse);
}

function removeElement(element) {
  console.log("removing");
  element.parentNode.removeChild(element);
}


/* ----------------------------------------------------------- END GAME STATE */
function displayScores(scores) {
  var text = ""
  bmfontTextSet(TEXT_LINE_0, "|SCORES|");
  for (var i=0; i<NUM_OF_PLAYERS; i++) {
    text += "|PLAYER " + (i+1) + ": " + SCORES[i] + "|";
  }
  bmfontTextSet(TEXT_LINE_1, text);
}

console.log("game-menu.js loaded");
