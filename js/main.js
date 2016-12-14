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
// global vars for actual list of PAWNS to iterate through
var NUM_OF_PAWNS = 5;
var PAWNS_LEFT = NUM_OF_PAWNS; // redundant?
var SPAWN_RADIUS = 10;
var THETA_RANGE = [0, 2*Math.PI];
var PHI_RANGE = [Math.PI/4, Math.PI/2];

// global vars for setting up movement interval
var MOVEMENT_PULSE = 1000;


function startRound() {
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

  bmfontTextSet(TEXT_LINE_1, "PLAYER " + (CURRENT_PLAYER+1));
  bmfontTextSet(TEXT_LINE_2, "BEGIN ROUND IN");
  var counting = setInterval(function(){
    bmfontTextSet(TEXT_LINE_3, count);
    count--;
  }, 1000) // close setInterval


}

function endRound() {

}

function endGame() {

}

function newGame() {

}
