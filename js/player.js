/** ------------------------- PLAYER FUNCTIONALITY ------------------------- **/
// PLAYER SCOREKEEPING
// PLAYER CURSOR TARGETING

// if time, consider--
  // laser SFX
  // player HP
  // player damage animation
  // bullet projecting

var SOUND_ROUNDOVER = document.getElementById("roundover");

/* ------------------------------------------------------ PLAYER SCOREKEEPING */

function maxScore(scores) {
  // returns index of max score, works on arrays of length 1
  var max = scores[0];
  for (var i=0; i<scores.length; i++) {
    if (scores[i] > max) {
      max = scores[i];
    }
  }
  return max;
}

function arrayOfZeroes(array_length) {
  if (array_length > 1) {
    return Array(array_length+1).join('0').split('').map(parseFloat); // does not work for array of length 1
  } else {
    return [0];
  }
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
  // // in case of cycling through multiple rounds:
  // CURRENT_PLAYER %= NUM_OF_PLAYERS; // cycle back down to 0 when incrementer passes NUM_OF_PLAYERS
  // console.log(CURRENT_PLAYER);
}

/* -------------------------------------------------- PLAYER CURSOR TARGETING */


console.log("player.js loaded");
