/** DOM MANIPULATION **/
/* ENEMY SPAWNING */
// uses sphericalToCartesian, randRange
// PAWNS represent enemies with the most basic movements (moving directly toward player)
// ORBITERS represent enemies that orbit while moving toward player.
// if time, consider--
  // enemy "explosion" animation
  // consider staggered spawning
  // bullet+collision physics
  // player HP
  // player damage animation
  // enemy HP

// collecting <a-entity>'s to which to append enemies of respective type
// enemy entity for "PAWN"
var PAWN_ENTITY = document.getElementById("enemy-pawns");
// // enemy entity for "ORBITERS"
// var ORBITER_ENTITY = document.getElementById("enemy-orbiters");
var ORIGIN = [0, 0, 0];
// actual list of PAWNS for iterating through
var PAWNS = spawnPawnsPartlyRandomly(20, 30, [0, 2*Math.PI], [Math.PI/4, Math.PI/2]);
advancePawns(PAWNS);

class Pawn {
  constructor(element) {
    this.element = element;
    this.position = positionAttributeAsArray(element);
  }
}


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

// set enemy's basic appearance
function createEnemyElement(type_name, shape, depth, color, spawnXYZ, entity) {
  // creates a single enemy element with enemy class
  // appends it to respective enemy a-entity (for organized HTML structure)
  var element = document.createElement("a-"+shape);
  element.className = type_name;
  element.setAttribute("depth", depth);
  element.setAttribute("color", color);
  element.setAttribute("position", spawnXYZ.join(" "));
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

// function assignEnemyAttributes(element, radius, theta_range, phi_range) {
//   /* ON CLICK */
//   element.setAttribute("onclick", "tallyScore();");
// }


/* ENEMY MOVEMENT */
// uses vector, distance, unitVector, addVector
// movement done on interval
function positionAttributeAsArray(element) {
  var xyz = [];
  xyz[0] = element.getAttribute("position").x;
  xyz[1] = element.getAttribute("position").y;
  xyz[2] = element.getAttribute("position").z;
  return xyz;
}

function stepPawnForward(element) {
  var xyz = positionAttributeAsArray(element);
  var unit = unitVector(xyz, ORIGIN);
  xyz = addVector(xyz, unit, 1);
  element.setAttribute("position", xyz.join(" "));
}

function advancePawns(pawns) {
  // iterates through list of pawns once
  pawns.forEach(function(element) {
    var xyz = positionAttributeAsArray(element);
    // console.log(xyz);
    var unit = unitVector(xyz, ORIGIN);
    // console.log(unit);

    // sets interval for each pawn
    // moving pawn a step on each interval
    setTimeout(function() {
      console.log("start");

      var movement = setInterval(function() {
        xyz = addVector(xyz, unit, 1);
        element.setAttribute("position", xyz.join(" "));
        if (shieldDetection(element)) {
            clearInterval(movement);
            console.log("stopped moving");
        };

      }, 1000);
    }, 5000);

  });
}

function shieldDetection(element) {
  var xyz = positionAttributeAsArray(element);
  return distance(xyz, ORIGIN) < 2;
}
