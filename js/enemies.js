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

// actual list of PAWNS for iterating through
var PAWNS = spawnPawns(20, 30, [0, 2*Math.PI], [Math.PI/4, Math.PI/2]);
advancePawns(PAWNS);

// generate pawns of shared appearance and random starting positions
// and make them appear in the DOM/scene
function spawnPawns(number_of_pawns, radius, theta_range, phi_range) {
  var pawns = [];
  var spawnXYZ;
  for (var i=0; i<number_of_pawns; i++){
    pawns[i] = createEnemyElement("pawn", "box", "1", "white");
    spawnXYZ = randomSpawnPoint(30, theta_range, phi_range);
    pawns[i].setAttribute("position", spawnXYZ.join(" "));
    PAWN_ENTITY.appendChild(pawns[i]);
  }
  return pawns;
}

// set enemy's basic appearance
function createEnemyElement(type_name, shape, depth, color) {
  // creates a single enemy element with enemy class
  // appends it to respective enemy a-entity (for organized HTML structure)
  var element = document.createElement("a-"+shape);
  element.className = type_name;
  element.setAttribute("depth", depth);
  element.setAttribute("color", color);
  return element;
}

// randomize coordinates within given ranges
function randomSpawnPoint(radius, theta_range, phi_range) {
  // radius: int or float, theta_range, phi_range: array of length 2
  // returns array of length 3
  // for upper hemisphere:
    // θ ∈ [0, 2π), φ ∈ [0, π/2]
    // theta_range = [0, 2*Math.PI]
    // phi_range = [0, Math.PI/2]
  var theta = randRange(theta_range[0], theta_range[1]);
  var phi = randRange(phi_range[0], phi_range[1]);
  spawnXYZ = sphericalToCartesian(radius, theta, phi);
  return spawnXYZ;
}

// // consider randomly generating spawn point
// // with each creation of enemy element
// // instead of separately, all at once, as a list
// // benefit of list: debugging
// function spawnPointList(num_of_points, radius, theta_range, phi_range) {
//   var list_of_xyz = [];
//   var spawnXYZ;
//   for (var i=0; i<num_of_points; i++) {
//     spawnXYZ = randomSpawnPoint(radius, theta_range, phi_range);
//     list_of_xyz.push(spawnXYZ);
//   }
//   return list_of_xyz;
// }


// function assignEnemyAttributes(element, radius, theta_range, phi_range) {
//   /* ON CLICK */
//   element.setAttribute("onclick", "tallyScore();");
// }


/* ENEMY MOVEMENT */
// uses vector, distance, unitVector, addVector
// movement done on interval
function positionToArray(element) {
  var xyz = [];
  xyz[0] = element.getAttribute("position").x;
  xyz[1] = element.getAttribute("position").y;
  xyz[2] = element.getAttribute("position").z;
  return xyz;
}



function advancePawns(pawns) {
  pawns.forEach(function(element) {
    var xyz = positionToArray(element);
    var unit = unitVector(xyz, [0, 0, 0]);
    console.log(unit);
    setInterval(function() {
      xyz = addVector(xyz, unit, 1);
      element.setAttribute("position", xyz.join(" "));
    }, 1000);

  });
}



/** PURE MATHEMATICS/GEOMETRY/TRIG **/
/* BASIC SPHERICAL MATH */
function sphericalToCartesian(radius, theta, phi) {
  // radius, theta, phi: int or float
  // returns an array of length 3
  // calculates a point in Cartesian space
  // from given spherical coordinates in RADIANS
  var x = radius * Math.sin(phi) * Math.sin(theta);
  var y = radius * Math.cos(phi);
  var z = radius * Math.sin(phi) * Math.cos(theta);
  return [x, y, z];
}

/* RANDOM GENERATOR MATH */
function randRange(min, max) {
  // min, max: arrays of length 3
  // returns an int or float
  // generates a random number between min and max
  return Math.random() * (max-min) + min;
}

/* BASIC CARTESIAN MATHS */
function vector(xyz1, xyz2) {
  // xyz1, xyz2: arrays of length 3
  // returns an array of length 3
  // calculates vector from point xyz1 to xyz2
  var dx = (xyz2[0]-xyz1[0]); // difference between the two x's
  var dy = (xyz2[1]-xyz1[1]); // difference between the two y's
  var dz = (xyz2[2]-xyz1[2]); // difference between the two z's
  return [dx, dy, dz];
}

function distance(xyz1, xyz2) {
  // xyz1, xyz2: arrays of length 3
  // returns a scalar int or float
  // calculates distance from point xyz1 to xyz2
  var dxyz = vector(xyz1, xyz2);
  var mag = Math.sqrt(dxyz[0]**2 + dxyz[1]**2 + dxyz[2]**2);
  return mag;
}

function unitVector(xyz1, xyz2) {
  // xyz1, xyz2: arrays of length 3
  // returns an array of length 3
  // calculates unit vector from point xyz1 to xyz2
  var vec = vector(xyz1, xyz2);
  var mag = distance(xyz1, xyz2);
  var unit = [vec[0]/mag, vec[1]/mag, vec[2]/mag];
  return unit;
}

function addVector(curr_xyz, unit_vector, magnitude) {
  // curr_xyz, unit_vector: arrays of length 3
  // magnitude: scalar, int or float
  // returns an array of length 3
  // adds unitVector * magnitude to a coordinate
  var next_xyz = [];
  next_xyz[0] = curr_xyz[0] + unit_vector[0]*magnitude;
  next_xyz[1] = curr_xyz[1] + unit_vector[1]*magnitude;
  next_xyz[2] = curr_xyz[2] + unit_vector[2]*magnitude;
  return next_xyz; // [x, y, z]
}
