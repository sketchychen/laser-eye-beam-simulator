/** -------------------------- MENU FUNCTIONALITY -------------------------- **/
// STREAMLINING DOM MANIPULATION

var MENU_ENTITY = document.getElementById("menu");
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
