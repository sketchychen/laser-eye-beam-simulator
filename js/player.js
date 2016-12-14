/** ------------------------- PLAYER FUNCTIONALITY ------------------------- **/
// PLAYER SCOREKEEPING
// PLAYER CURSOR TARGETING

// if time, consider--
  // laser SFX
  // player HP
  // player damage animation
  // bullet projecting

var ORIGIN = [0, 0, 0];
var SHIELD_RADIUS = 3;
var NUM_OF_PLAYERS = 2;
var CURRENT_PLAYER = 0; // cycles through using nextPlayer()
var SCORES = arrayOfZeroes(NUM_OF_PLAYERS);

/* ------------------------------------------------------ PLAYER SCOREKEEPING */
function arrayOfZeroes(array_length) {
  return Array(array_length+1).join('0').split('').map(parseFloat);
}

function zeroScores() {
  SCORES = arrayOfZeroes(NUM_OF_PLAYERS);
}

function tallyScore(player) {
  SCORES[player]++;
  console.log(SCORES);
}

function nextPlayer() { // in case of multiple players
  CURRENT_PLAYER++; // next player
  CURRENT_PLAYER %= NUM_OF_PLAYERS; // cycle back down to 0 when incrementer passes NUM_OF_PLAYERS
  console.log(CURRENT_PLAYER);
}

/* -------------------------------------------------- PLAYER CURSOR TARGETING */
