/** -------------------- PURE MATHEMATICS/GEOMETRY/TRIG -------------------- **/

/* ---------------------------------------------------- RANDOM GENERATOR MATH */
function randRange(min, max) {
  // min, max: arrays of length 3
  // returns an int or float
  // generates a random number between min and max
  return Math.random() * (max-min) + min;
}

/* ----------------------------------------------------------- CARTESIAN MATH */
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

console.log("game-mathematics.js loaded");
