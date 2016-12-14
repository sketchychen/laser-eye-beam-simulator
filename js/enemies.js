/** ------------------------- ENEMY FUNCTIONALITY -------------------------- **/
// ENEMY ELEMENT CREATION AND SPAWNING
// ENEMY MOVEMENT
// ENEMY ACTIONS/ONCLICK

// if time, consider--
  // multiple enemy types (e.g. "ORBITER", "SUPER PAWN", "BOSS", etc.)
  // staggered spawning
  // bullet+collision physics
  // enemy HP

var SOUND_EXPLOSION = document.getElementById("explosion");

// collecting <a-entity>'s to which to append enemies of respective type
var PAWN_ENTITY = document.getElementById("enemy-pawns");
// var ORBITER_ENTITY = document.getElementById("enemy-orbiters");


class Enemy {
  constructor(type, element, moveInterval) {
    this.type = type;
    this.element = element;
    this.moveInterval = moveInterval;
  }
}


/* -------------------------------------- ENEMY ELEMENT CREATION AND SPAWNING */
// uses sphericalToCartesian, randRange from game-math.js
// PAWNS represent enemies with the most basic movements (moving directly toward player)
// ORBITERS represent enemies that orbit while moving toward player.

// generate pawns of shared appearance and random starting positions
// and make them appear in the DOM/scene
function spawnPawnsRandomly(number_of_pawns, radius, theta_range, phi_range) {
  var pawns = [];
  for (var i=0; i<number_of_pawns; i++){
    var spawnXYZ = randomSpawnPoint(30, theta_range, phi_range);
    pawns[i] = createEnemyElement("pawn", "box", "1", "white",  spawnXYZ, PAWN_ENTITY);
  }
  return pawns;
}
function spawnPawnsPartlyRandomly(number_of_pawns, radius, theta_range, phi_range) {
  var pawns = [];
  var theta = theta_range[0]; // usually starts at zero
  var d_theta = (theta_range[1]-theta_range[0])/number_of_pawns; // divide range by number of pawns
  for (var i=0; i<number_of_pawns; i++){
    var spawnXYZ = sphericalToCartesian(30, theta, randRange(phi_range[0], phi_range[1]));
    pawns[i] = createEnemyElement("pawn", "box", "1", "white",  spawnXYZ, PAWN_ENTITY);
    theta += d_theta;
  }
  return pawns;
}
// set enemy's basic attributes and append to parent entity
function createEnemyElement(type_name, shape, depth, color, spawnXYZ, entity) {
  // creates a single enemy element with enemy class
  // appends it to respective enemy a-entity (for organized HTML structure)
  var element = document.createElement("a-"+shape);
  element.className = "enemy"
  element.className += " " + type_name;
  element.setAttribute("depth", depth);
  element.setAttribute("color", color);
  element.setAttribute("position", spawnXYZ.join(" "));
  element.setAttribute("visible", "true"); // later may be toggled
  entity.appendChild(element);
  return element;
}
// randomize coordinates within given ranges
function randomSpawnPoint(radius, theta_range, phi_range) {
  // radius: int or float, theta_range, phi_range: array of length 2
  // returns array of length 3
  // for upper hemisphere: θ ∈ [0, 2π), φ ∈ [0, π/2]
    // theta_range = [0, 2*Math.PI]; phi_range = [0, Math.PI/2]
  var theta = randRange(theta_range[0], theta_range[1]);
  var phi = randRange(phi_range[0], phi_range[1]);
  spawnXYZ = sphericalToCartesian(radius, theta, phi);
  return spawnXYZ;
}
// randomize coordinates within given ranges
function partlyRandomSpawnPoint(radius, theta, phi_range) {
  // radius, theta: int or float, phi_range: array of length 2
  // returns array of length 3
  // for upper hemisphere: θ ∈ [0, 2π), φ ∈ [0, π/2]
    // theta_range = [0, 2*Math.PI]; phi_range = [0, Math.PI/2]
  // theta is not random; presumably it will increase iteratively in some for loop or similar
  // phi remains random for varied polar angle
  var phi = randRange(phi_range[0], phi_range[1]);
  spawnXYZ = sphericalToCartesian(radius, theta, phi);
  return spawnXYZ;
}


/* ----------------------------------------------------------- ENEMY MOVEMENT */
// uses vector, distance, unitVector, addVector from game-math.js

// start incremental interval movement after a timeout
function advancePawns(pawns, step_pulse) {
  // iterates through list of pawns once, sets interval for each pawn to move on each step
  // pawns.forEach(function(element) {
  for (var i=0; i<pawns.length; i++) {
    var pawn_element = pawns[i]; // temporarily save current element for next line of code

    // overwrite index space with Class object
    pawns[i] = new Enemy("Pawn", pawn_element);
    pawns[i].moveInterval = movementInterval(pawns[i], step_pulse)

    console.log("start");

    // able to take damage after countdown, but not before
    pawns[i].element.setAttribute("onclick", "takeDamage(this)");

  };
} // closing function

function movementInterval(enemyClassObj, step_pulse) {
  return setInterval(function() { // begin movement AND ALSO FIX THIS
    stepPawnForward(enemyClassObj.element);
    if (destinationDetection(enemyClassObj.element)) {
        endRound();
    }; // closing if statement
  }, step_pulse); // closing setInterval
}

function stepPawnForward(element) {
  var xyz = positionAttributeAsArray(element); // produces easier format of element's position
  var unit = unitVector(xyz, ORIGIN); // calculates the unit vector to ORIGIN
  xyz = addVector(xyz, unit, 1);  // adds (unit) vector to element's position
  element.setAttribute("position", xyz.join(" ")); // updates element's position in DOM
}

function positionAttributeAsArray(element) {
  var xyz = [];
  xyz[0] = element.getAttribute("position").x;
  xyz[1] = element.getAttribute("position").y;
  xyz[2] = element.getAttribute("position").z;
  return xyz;
}

function destinationDetection(element) {
  var xyz = positionAttributeAsArray(element);
  return distance(xyz, ORIGIN) < PLAYER_RADIUS;
}

/* ---------------------------------------------------- ENEMY ACTIONS/ONCLICK */
function remotelyClearInterval(enemyList, element) {
  enemyList.forEach(function(object) {
    if (object.element === element) {
      clearInterval(object.moveInterval);
    }
  })
}

function remotelyClearAllIntervals(enemyList) {
  enemyList.forEach(function(object) {
    clearInterval(object.moveInterval);
  })
}

function takeDamage(element) {
  console.log(element);
  remotelyClearInterval(PAWNS, element); // remove movement interval
  element.removeAttribute("onclick");

  var flash_pulse = 300;
  var flash = flashAnimation(element, flash_pulse);
  tallyScore(CURRENT_PLAYER); // mark one for the player
  PAWNS_LEFT--; // keep track of how many are left
  SOUND_EXPLOSION.play();
  
  setTimeout(function() {
    clearInterval(flash); // stop thing
    removeElement(element); // enemy was eliminated, remove from DOM

  }, flash_pulse*7);

}

function clearRemainingEnemies(entity) {
  while (entity.firstChild) {
      entity.removeChild(entity.firstChild);
  }
}

console.log("enemies.js loaded");
