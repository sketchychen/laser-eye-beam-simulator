var MENU_ENTITY = document.getElementById("menu");
var UPPER_TEXT = document.getElementById("upper-text");
var PROMPT = document.getElementById("prompt");
var PROMPT_TEXT = document.getElementById("prompt-text");
var PROMPT_CURSOR = document.getElementById("prompt-cursor");

var text_cursor_flash = flashAnimation(PROMPT_CURSOR, 500); // because REASONS

function bmfontTextSet(element, string) {
  var text = "text: " + string;
  element.setAttribute("bmfont-text", text);
}
