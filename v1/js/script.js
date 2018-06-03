//   name: 'rainbow',
//   values: ['58C1DA', '30A135', 'EBC335', 'F2461C', 'D72827', 'CCCCCC']
// }, {
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 25, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


camera.position.set(0,0,80);
//
// var subjMat = new THREE.MeshBasicMaterial();
var iteration = 0;
var totalIterations = 240;
var easingValue, easePos=0, axisPos=0;
var easeArr = ["easeInQuad","easeOutQuad","easeInOutQuad","easeInCubic","easeOutCubic","easeInOutCubic","easeInQuart","easeOutQuart","easeInOutQuart","easeInQuint","easeOutQuint","easeInOutQuint", "easeInSine","easeOutSine","easeInOutSine","easeInExpo","easeOutExpo","easeInOutExpo","easeInCirc","easeOutCirc","easeInOutCirc","easeInElastic","easeOutElastic","easeInOutElastic","easeInBack","easeOutBack","easeInOutBack"];
var axisArr = ['x', 'y', 'z'];
var subj;
var subjMat = new THREE.MeshPhongMaterial({
  color:0xccaaff, 
  shininess:11, 
  specular:0xffaacc, 
  shading: THREE.SmoothShading
  // shading: THREE.FlatShading
});
subjMat.map = THREE.ImageUtils.loadTexture('img/deer/deer.jpg');
subjMat.side = THREE.BackSide;
subjMat.bumpMap = THREE.ImageUtils.loadTexture('img/deer/deerBump.jpg');
var itmArr = [];
var vx, vy, vz;

var loader = new THREE.JSONLoader(); // init the loader util

loader.load('img/deer/deer.js', function (geometry) {
  
    subj = new THREE.Mesh(geometry,subjMat);
    geometry.computeVertexNormals();
    var scl = 1;
    subj.scale.set(scl,scl,scl);
    subj.rotation.y = convertToRad(90);
    scene.add(subj);
    
  
});
var spotlight = new THREE.PointLight(0xffffff);
spotlight.position.set(-20,30,55);

scene.add(spotlight);

var light2 = new THREE.PointLight(0xccaaff);
light2.position.set(20,30,5);

scene.add(light2);

var bar = document.getElementById("pct");
document.getElementById("label").innerHTML = easeArr[easePos];
//
var render = function () {
  requestAnimationFrame( render );

  update();

  renderer.render(scene, camera);
};

render();


function update(){
  iteration++;
  easingValue = Easing[easeArr[easePos]](iteration, 90, 360, totalIterations);
    subj.rotation.y = convertToRad(easingValue);
    // subj.rotation[axisArr[axisPos]] = convertToRad(easingValue);
    if(iteration>totalIterations){
      iteration =0;
      easePos++;
      axisPos++;
      if(easePos>=easeArr.length){
        easePos=0;
      }
      if(axisPos>=axisArr.length){
        axisPos = 0;
      }
      document.getElementById("label").innerHTML = easeArr[easePos];
    }
    var pct = iteration/totalIterations
    // console.log(pct);
    var num = Math.floor(120*pct);
    bar.style.width = num+"px";

  
  // subj.rotation.y -= convertToRad(0.4);
}


function convertToRad(deg){
  return deg*Math.PI/180;
}

function randNum(n){
  var p = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
  return p*n;
}