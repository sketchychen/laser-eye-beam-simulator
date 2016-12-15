// startRound countdown
var COUNTDOWN = 5000;

/* ENEMY GLOBAL VARIABLES */
// number of pawns, where they spawn
var NUM_OF_PAWNS = 10
var PAWNS_LEFT = NUM_OF_PAWNS;
var PAWNS = [];
var SPAWN_RADIUS = 20;
var THETA_RANGE = [0, 2*Math.PI];
var PHI_RANGE = [Math.PI/4, Math.PI/2];

// global vars for setting up movement interval
var MOVEMENT_PULSE = 1000;

/* PLAYER GLOBAL VARIABLES */
// scores, hit box radius
var ORIGIN = [0, 0, 0]; // opting to not have the enemies to go for the player's head where the camera is
var PLAYER_RADIUS = 2;
var NUM_OF_PLAYERS = 2;
var CURRENT_PLAYER = 0; // cycles through using nextPlayer()
var SCORES = arrayOfZeroes(NUM_OF_PLAYERS);


function resetGame() {
  /* PLAYER RESET */
  SCORES = arrayOfZeroes(NUM_OF_PLAYERS);
  CURRENT_PLAYER = 0;

  /* ENEMY RESET */
  clearRemainingEnemies(PAWN_ENTITY);
  PAWNS = [];

  /* GAME MENU RESET */
  toggleVisible(PROMPT);
  clearAllScreenText();
  PROMPT.setAttribute("onclick", "startRound();");
  bmfontTextSet(TEXT_LINE[0], "START GAME?");
  setTimeout(function() { toggleVisible(PROMPT); }, 2000);
}


function startRound() {
  // hide PROMPT to avoid further clicking
  toggleVisible(PROMPT);
  clearAllScreenText();
  clearRemainingEnemies(PAWN_ENTITY);
  PAWNS_LEFT = NUM_OF_PAWNS;
  PAWNS = [];

  /* SPAWNING ENEMIES */
  // first generate list of elements
  PAWNS = spawnPawnsPartlyRandomly(NUM_OF_PAWNS, SPAWN_RADIUS, THETA_RANGE, PHI_RANGE);
  // convert list of elements to list of class objects
  PAWNS = objectifyEnemies(PAWNS);

  /* COUNT DOWN TO DO THE THINGS */
  var count = COUNTDOWN/1000;
  var start_everything = setTimeout(function(){
    clearInterval(counting);
    clearAllScreenText();
    toggleVisible(MENU_ENTITY);
    advancePawns(PAWNS, MOVEMENT_PULSE); // pawns, move out!
  }, COUNTDOWN+1000); // close timeout

  /* IN THE MEANWHILE, COUNTDOWN ON MENU */
  bmfontTextSet(TEXT_LINE[1], "DESTROY THE " + NUM_OF_PAWNS + " BOXES");
  bmfontTextSet(TEXT_LINE[2], "BEFORE THEY REACH YOU.")
  bmfontTextSet(TEXT_LINE[0], "PLAYER " + (CURRENT_PLAYER+1));
  var counting = setInterval(function(){
    bmfontTextSet(TEXT_LINE[3], "BEGIN ROUND IN " + count);
    count--;
  }, 1000) // close setInterval


}

function endRound() {
  remotelyClearAllIntervals(PAWNS);
  remotelyClearAllOnclickAttribute(PAWNS);
  console.log("reached player");
  SOUND_ROUNDOVER.play()
  setTimeout(function() {
    toggleVisible(MENU_ENTITY);
    displayScores();
  }, 1000); // work on endRound conditions (this repeats for every object)


  if (NUM_OF_PLAYERS > 1) {
    console.log("more than one player set");
    nextPlayer(); // update current player
    setTimeout(function() { // prompt user to hand off to next player
      if (CURRENT_PLAYER < NUM_OF_PLAYERS) {
        clearRemainingEnemies(PAWN_ENTITY);
        bmfontTextSet(TEXT_LINE[2], "PLEASE HAND VISOR TO PLAYER " + (CURRENT_PLAYER+1));
        setTimeout(function () {
          bmfontTextSet(TEXT_LINE[3], "PLAYER " + (CURRENT_PLAYER+1) + ", ARE YOU READY?");
          setTimeout(function() { toggleVisible(PROMPT); }, 2000);
        }, 5000);
      } else {
        console.log("no more players left")
        endGame();
      }

    }, 5000); // closing setTimeout

  } else {
    console.log("only single player");
    console.log("end the game");
    endGame();
  }
}

function endGame() {
  clearRemainingEnemies(PAWN_ENTITY);
  var winners = bestScores(SCORES);
  console.log(winners); // add one to each number
  bmfontTextSet(TEXT_LINE[2], "YAY FOR PLAYER " + winners.join(" and ") + ".");
  setTimeout(function () {
    bmfontTextSet(TEXT_LINE[3], "RESET GAME?");
    PROMPT.setAttribute("onclick", "resetGame();")
    setTimeout(function() { toggleVisible(PROMPT); }, 2000);
  }, 5000);

}

console.log("main.js loaded");
