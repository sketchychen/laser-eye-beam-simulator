function vector(xyz1, xyz2) {
  /*
  parameters are arrays of length 3
  returns an array of length 3
  calculates vector from point xyz1 to xyz2
  */
  var dx = (xyz1[0]-xyz2[0]);
  var dy = (xyz1[1]-xyz2[1]);
  var dz = (xyz1[2]-xyz2[2]);
  return [dx, dy, dz];
}

function magnitude(xyz1, xyz2) {
  /*
  parameters are arrays of length 3
  returns a scalar float
  calculates vector from point xyz1 to xyz2
  */
  var deltaXYZ = vector(xyz1, xyz2);
  var magXYZ = Math.sqrt(deltaXYZ[0]**2 + deltaXYZ[1]**2 + deltaXYZ[2]**2);
  return magXYZ;
}

function unitVector(xyz1, xyz2) {
  /*
  parameters are arrays of length 3
  returns an array of length 3
  calculates unit vector from point xyz1 to xyz2
  */
  var vec = vector(xyz1, xyz2);
  var mag = magnitude(xyz1, xyz2);
  var unit = [vec[0]/mag, vec[1]/mag, vec[2]/mag];
  return unit;
}
