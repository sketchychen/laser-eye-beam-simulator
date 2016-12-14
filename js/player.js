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
var CURRENT_PLAYER = 0;
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

function nextPlayer(current) { // in case of multiple players
  // local variable names used for readability (e.g. instead of just using current++)
  var next = current+1; // next player
  next %= NUM_OF_PLAYERS; // cycle back down to 0 when incrementer passes NUM_OF_PLAYERS
  return next;
}

/* -------------------------------------------------- PLAYER CURSOR TARGETING */
