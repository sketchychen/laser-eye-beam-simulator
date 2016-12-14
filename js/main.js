// AFRAME.registerComponent('scale-on-click', {
//   schema: {
//     to: {default: '2 2 2'}
//   },
//   init: function () {
//     var data = this.data;
//     this.el.addEventListener('click', function () {
//       this.setAttribute('scale', data.to);
//     });
//   }
// });
//
// AFRAME.registerComponent('collider-check', {
//   dependencies: ['raycaster'],
//   init: function () {
//     this.el.addEventListener('raycaster-intersected', function () {
//       console.log('Player hit something!');
//     });
//   }
// });

// startRound countdown
var COUNTDOWN = 5000;

/* ENEMY GLOBAL VARIABLES */
// number of pawns, where they spawn
var NUM_OF_PAWNS = 5
var PAWNS_LEFT = NUM_OF_PAWNS; // redundant?
var SPAWN_RADIUS = 10;
var THETA_RANGE = [0, 2*Math.PI];
var PHI_RANGE = [Math.PI/4, Math.PI/2];

// global vars for setting up movement interval
var MOVEMENT_PULSE = 1000;

/* PLAYER GLOBAL VARIABLES */
// scores, hit box radius
var ORIGIN = [0, 0, 0]; // opting to not have the enemies to go for the player's head at [0, 1.68, 0]
var PLAYER_RADIUS = 2;
var NUM_OF_PLAYERS = 2;
var CURRENT_PLAYER = 0; // cycles through using nextPlayer()
var SCORES = arrayOfZeroes(NUM_OF_PLAYERS);


// startGame();
//
// function startGame() {
//   bmfontTextSet(TEXT_LINE_0, "START GAME?");
//   toggleVisible(PROMPT);
// }


function startRound() {
  // hide PROMPT to avoid further clicking
  toggleVisible(PROMPT);

  /* ENEMY SET-UP */
  var PAWNS = spawnPawnsPartlyRandomly(NUM_OF_PAWNS, SPAWN_RADIUS, THETA_RANGE, PHI_RANGE);

  /* PLAYER SET-UP */

  /* COUNT DOWN TO DO THE THINGS */
  var count = COUNTDOWN/1000;
  var start_everything = setTimeout(function(){
    clearInterval(counting);
    toggleVisible(MENU_ENTITY);
    advancePawns(PAWNS, MOVEMENT_PULSE);
  }, COUNTDOWN+1000); // close timeout

  /* IN THE MEANWHILE, COUNTDOWN ON MENU */
  bmfontTextSet(TEXT_LINE_0, "PLAYER " + (CURRENT_PLAYER+1));
  var counting = setInterval(function(){
    bmfontTextSet(TEXT_LINE_1, "BEGIN ROUND IN " + count);
    count--;
  }, 1000) // close setInterval


}

function endRound() {
  toggleVisible(MENU_ENTITY);
  displayScores();

  if (NUM_OF_PLAYERS > 1) {
    console.log("more than one player set")
    nextPlayer(); // update current player
    console.log("next player up, player " + CURRENT_PLAYER);
    setTimeout(function() { // prompt user to hand off to next player
      if (CURRENT_PLAYER < NUM_OF_PLAYERS) {
        bmfontTextSet(TEXT_LINE_2, "HAND VISOR TO PLAYER " + CURRENT_PLAYER);
      }

    }, 5000); // closing setTimeout

  } else {
    console.log("end the game")
    // endGame();
  }
}

function endGame() {

}

function newGame() {

}


console.log("main.js loaded");
