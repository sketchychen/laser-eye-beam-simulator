/** DOM SHIT **/
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

// enemy entity "PAWN"
// <a-entity> to which to append basic type enemy
var PAWN_ENEMIES = document.getElementById("enemy-pawns");
// // save ORBITERS for later
// var ORBITERS = document.getElementById("enemy-orbiters");

var pawns = spawnPawns(20, 30, [0, 2*Math.PI], [Math.PI/4, Math.PI/2]);

function spawnPawns(number_of_pawns, radius, theta_range, phi_range) {
  var pawns = [];
  var spawnXYZ;
  for (var i=0; i<number_of_pawns; i++){
    pawns[i] = createEnemyElement("pawn", "box", "1", "white");
    spawnXYZ = randomSpawnPoint(30, theta_range, phi_range);
    pawns[i].setAttribute("position", spawnXYZ.join(" "));
    PAWN_ENEMIES.appendChild(pawns[i]);
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

// consider randomly generating spawn point
// with each creation of enemy element
// instead of separately, all at once, as a list
// benefit of list: debugging
function spawnPointList(num_of_points, radius, theta_range, phi_range) {
  var list_of_xyz = [];
  var spawnXYZ;
  for (var i=0; i<num_of_points; i++) {
    spawnXYZ = randomSpawnPoint(radius, theta_range, phi_range);
    list_of_xyz.push(spawnXYZ);
  }
  return list_of_xyz;
}


function assignEnemyAttributes(element, radius, theta_range, phi_range) {
  /* APPEARANCE */
  element.setAttribute("color", "green");
  element.setAttribute("rotation", "0 0 0");

  /* STARTING POINT */
  var spawnXYZ = randomSpawnPoint(radius, theta_range, phi_range);
  // turn into string for attribute value assignment
  var spawnXYZ_str = spawnXYZ.join(" ");
  element.setAttribute("position", spawnXYZ_str);

  /* ON CLICK */
  element.setAttribute("onclick", "tallyScore();");
}


/* ENEMY MOVEMENT */
// uses vector, distance, unitVector, addUnitVector
// movement done on interval


/** MATH SHIT **/
/* BASIC SPHERICAL MATHS */
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
  var dx = (xyz1[0]-xyz2[0]); // difference between the two x's
  var dy = (xyz1[1]-xyz2[1]); // difference between the two y's
  var dz = (xyz1[2]-xyz2[2]); // difference between the two z's
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

function addUnitVector(curr_xyz, unit_vector, magnitude) {
  // curr_xyz, unit_vector: arrays of length 3
  // magnitude: scalar
  // returns an array of length 3
  // adds unitVector * magnitude to a coordinate
  var next_xyz = [];
  next_xyz[0] = curr_xyz[0] + unit_vector[0]*magnitude;
  next_xyz[1] = curr_xyz[1] + unit_vector[1]*magnitude;
  next_xyz[2] = curr_xyz[2] + unit_vector[2]*magnitude;
  return next_xyz; // [x, y, z]
}
