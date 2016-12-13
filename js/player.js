/** ------------------------- PLAYER FUNCTIONALITY ------------------------- **/
// PLAYER TURN AND SCORING
// PLAYER CURSOR TARGETING

// if time, consider--
  // laser SFX
  // player HP
  // player damage animation
  // bullet projecting

var ORIGIN = [0, 0, 0];
var SHIELD_RADIUS = 3;
var SCORE = 0;
var NUM_OF_PLAYERS


/* -------------------------------------------------- PLAYER TURN AND SCORING */
function tallyScore() {
  SCORE++;
}

function clearScore() {
  SCORE = 0;
}

/* -------------------------------------------------- PLAYER CURSOR TARGETING */
