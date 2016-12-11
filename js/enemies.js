/** DOM SHIT **/
/* ENEMY SPAWNING */
// uses sphericalToCartesian, randRange
// consider "equally spaced spawns"

/* ENEMY MOVEMENT */
// uses vector, distance, unitVector


/** MATH SHIT **/
/* BASIC SPHERICAL MATHS */
function sphericalToCartesian(radius, theta, phi) {
  // parameters are all singular ints or floats
  // returns an array
  // calculates a point in Cartesian space
  // from given spherical coordinates
  var x = radius * Math.sin(theta) * Math.cos(phi);
  var y = radius * Math.sin(theta) * Math.sin(phi);
  var z = radius * Math.cos(theta);
  return [x, y, z];
}

/* RANDOM GENERATOR MATH */
function randRange(min, max) {
  // parameters are all singular ints or floats
  // returns an int or float between min and max
  return Math.random() * (max-min) + min;
}

/* BASIC CARTESIAN MATHS */
function vector(xyz1, xyz2) {
  // parameters are arrays of length 3
  // returns an array of length 3
  // calculates vector from point xyz1 to xyz2
  var dx = (xyz1[0]-xyz2[0]);
  var dy = (xyz1[1]-xyz2[1]);
  var dz = (xyz1[2]-xyz2[2]);
  return [dx, dy, dz];
}

function distance(xyz1, xyz2) {
  // parameters are arrays of length 3
  // returns a scalar float
  // calculates distance from point xyz1 to xyz2
  var dxyz = vector(xyz1, xyz2);
  var mag = Math.sqrt(dxyz[0]**2 + dxyz[1]**2 + dxyz[2]**2);
  return mag;
}

function unitVector(xyz1, xyz2) {
  // parameters are arrays of length 3
  // returns an array of length 3
  // calculates unit vector from point xyz1 to xyz2
  var vec = vector(xyz1, xyz2);
  var mag = distance(xyz1, xyz2);
  var unit = [vec[0]/mag, vec[1]/mag, vec[2]/mag];
  return unit;
}
