AFRAME.registerComponent('scale-on-click', {
  schema: {
    to: {default: '2 2 2'}
  },
  init: function () {
    var data = this.data;
    this.el.addEventListener('click', function () {
      this.setAttribute('scale', data.to);
    });
  }
});

var sphere = document.getElementsByTagName("a-sphere")[0];

var scene = document.getElementsByTagName("a-scene")[0];

var testSphere = document.createElement("a-sphere");

// make an enemy and set it off {
var pacman = document.createElement("a-cylinder");
pacman.setAttribute("position", "-3 2 -6");
pacman.setAttribute("color", "yellow");
pacman.setAttribute("rotation", "90 0 0");
pacman.setAttribute("theta-start", "130");
pacman.setAttribute("theta-length", "280");
pacman.setAttribute("side", "double");

scene.appendChild(pacman);

var XYZ = [-2, 2, -4];

var bloop = setInterval(function() {
  xyzString = XYZ.join(' ');
  pacman.setAttribute("position", xyzString);
  XYZ[0]++
}, 1000);
// }
