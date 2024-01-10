var ccA = 0;
var ccB = 0;
var ccC = 0;
var ccD = 0;
var ccE = 0;
var ccF = 0;
var ccG = 0;
var ccH = 0;
var ccI = 0;
var obj;
var mobi;
var wobi;
var objswitch =0;
var tex3;

function setup() {




  createCanvas(400, 250, WEBGL);
  tex3 = createGraphics(128, 128, WEBGL);

  
  textSize(width / 10);
  textAlign(LEFT, CENTER);
  // Enable WebMidi.js and trigger the onWebMidiEnabled() function when ready.
  WebMidi.enable()
    .then(onWebMidiEnabled)
    .catch(err => alert(err));

}


function preload() {
  
 obj = loadModel("untitled.obj");
 mobj = loadModel("mobi.obj");
 wobj = loadModel("wobi.obj");
 myShader2 = loadShader("vertShader.vert", "texture.frag");
 myShader3 = loadShader("objshad.vert", "objshad.frag");
}


function draw() {

  var mapccR = map(ccE, 0, 1, 0, 255);
  var mapccG = map(ccF, 0, 1, 0, 255);
  var mapccB = map(ccG, 0, 1, 0, 255);
  background(mapccG,mapccB, mapccR);


  push();

  tex3.shader(myShader2);
  tex3.rect(0, 0, 540, 540);
 
  pop();

  myShader2.setUniform("u_time", frameCount * 0.1);
  myShader2.setUniform("u_resolution", [width / 2, height]);
  var mapccC = map(ccC, 0, 1, 0, .3);
  myShader2.setUniform("speed", mapccC);
  var mapccD = map(ccD, 0, 1, 0, 20);
  myShader2.setUniform("amp", mapccD);
  myShader2.setUniform("offset", mapccD);
  myShader3.setUniform("red", ccE);
  myShader3.setUniform("green", ccF);
  myShader3.setUniform("blue", ccG);

  myShader3.setUniform("uFrameCount", frameCount);
  myShader3.setUniform("u_resolution", [width, height]);
  var mapccB = map(ccB, 0, 1, 0, .01)
  myShader3.setUniform("mX", mapccB);

  myShader3.setUniform("uNoiseTexture",tex3);
  myShader3.setUniform("fraction", 1.0);



  
  
  push();
  shader(myShader3);
  noStroke();
  translate(0,0)
 
  directionalLight(0, 205, 204, .5, 1, -1);
  ambientMaterial(55, 255, 205);
  scale(100);
  angleMode(DEGREES);
   var mapccA = map(ccA, 0, 1, 0, 1.);
   var mapccI = map(ccI, 0, 1, 0, 360);
   rotateY(frameCount * mapccA);
   rotateX(mapccI);
  texture(tex3);
  if(objswitch ==0){
    model(obj);
  }
  if(objswitch==1){
    model(mobj);
  }
  if(objswitch==2){
    model(wobj);
  }

  pop();
}

function onWebMidiEnabled() {

  // Check if at least one MIDI input is detected. If not, display warning and quit.
  if (WebMidi.inputs.length < 1) {
    alert("No MIDI inputs detected.");
    return;
  }

  // Add a listener on all the MIDI inputs that are detected
  WebMidi.inputs.forEach(input => {

    // When a "note on" is received on MIDI channel 1, generate a random color start
    input.channels[1].addListener("controlchange", cc => {

      if(cc.controller.number == 0){
        ccA = cc.value;
      }
      if(cc.controller.number == 1){
        ccB = cc.value;
      }
      if(cc.controller.number == 2){
        ccC = cc.value;
      }
      if(cc.controller.number == 3){
        ccD = cc.value;
      }
      if(cc.controller.number == 4){
        ccE = cc.value;
      }
      if(cc.controller.number == 5){
        ccF = cc.value;
      }
      if(cc.controller.number == 6){
        ccG = cc.value;
      }
      if(cc.controller.number == 7){
        ccH = cc.value;
      }
      if(cc.controller.number == 8){
        ccI = cc.value;
      }

      




     
    });
    input.channels[1].addListener("noteon", n => {
      if(n.note.number == 0){
        objswitch = 0;
        console.log("hi");
      }
      if(n.note.number== 1){
        objswitch = 1;
        console.log("there");
      }
      if(n.note.number== 2){
        objswitch = 2;
        console.log("buf");
      }
    });


  });

}
function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
