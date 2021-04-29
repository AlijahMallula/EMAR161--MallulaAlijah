//PROBLEMS: 1. Songs don't loop over eachother, they stop and play the other song. 2. It BUFFERS CONSISTENTLY AND REFUSES TO WORK CONSISTENTLY

//POTENTIAL SOLUTIONS: 1. Add it into the if else statements to loop over and not stop playing when the other shapes are hovered over. 2. Take out .obj files and replace with 2D objects

let video1;
let poseNet;
let poses = [];
let skeletons = [];

//obj variables
let dice;
let cube;
let slider;

//variables for sound:
let song;
let song2;
let song3;

function preload() {
  dice = loadModel('button.obj');
  cube = loadModel('cube.obj');
  slider = loadModel('slider.obj');

}


function setup() {

  //load song:
  song = loadSound("Tourniquet.mp3");
  song2 = loadSound("Ninja.mp3");
  song3 = loadSound(".mp3");

  frameRate(10);

  createCanvas(640, 480, WEBGL);

  video1 = createCapture(VIDEO); //initiate webcam
  video1.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video1, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video1.hide();

}

function modelReady() {
  select('#status').html('Model Loaded'); //select the html element
  //that says "Model Loaded" when done
}

function draw() {
  texture(video1);
  plane(640, 480);
  strokeWeight(5);
  stroke(0);

  songPlayed();
}

// A function to draw ellipses over the detected keypoints
function songPlayed() {

  if(poses.length>=1) {
    
    i = 0;
  
    //drawing from left hand:
    let leftWrist = poses[i].pose.keypoints[9];
    if (leftWrist.score > 0.1) {
      push();
      fill(0, 0, 255);
      noStroke();
      ellipse(leftWrist.position.x - 640 / 2, leftWrist.position.y - 480 / 2, 30, 30);
      pop();
    }

    //TRANSLATES MESS EVERYTHING UP DON'T USE THEM
    //drawing from right hand
    let rightWrist = poses[i].pose.keypoints[10];
    if (rightWrist.score > 0.1) {
      push();
      fill(0, 0, 255);
      noStroke(2);
      ellipse(rightWrist.position.x - 640 / 2, rightWrist.position.y - 480 / 2, 30, 30);
      pop();
    }

    //THIS PLAYS THE FIRST PART Tourniquet
    // this is the position (x,y) of button 2
    let d2x = 105;
    let d2y = 150;

    // check dist from wrist to button 1
    let d = dist(leftWrist.position.x - 320, leftWrist.position.y - 240,
      d2x, d2y);

    if (d < 200) {
      //Button 2
      push();
      translate(d2x, d2y, 0);
      fill("blue");
      strokeWeight(2);
      scale(40);
      model(dice);
      pop();
      if (!song.isPlaying() && !song.isPlaying()) {
        song.play();
      } else {
        song.stop();
        //end of else
      }
    } else {
      push();
      translate(d2x, d2y, 0);
      fill("Lavender");
      strokeWeight(2);
      scale(40);
      model(dice);
      pop();
    }



  //THIS PLAYS THE SECOND PART Ninja
  // this is the position (x,y) of button 2
  let b2x = -90;
  let b2y = 150;

  // check dist from wrist to button 2
  let f = dist(rightWrist.position.x - 320,
    rightWrist.position.y - 240,
    b2x, b2y);

  if (f < 100) {
    //Button 2
    push();
    translate(b2x, b2y, 0);
    fill("blue");
    strokeWeight(2);
    scale(40);
    model(cube);
    pop();
    if (!song2.isPlaying() && !song2.isPlaying()) {
      song2.play();
    } else {
      song2.stop();
      //end of else
    }
  } else {
    push();
    translate(b2x, b2y, 0);
    fill("coral");
    strokeWeight(2);
    scale(40);
    model(cube);
    pop();
  }
    
    //THIS PLAYS THE THIRD PART: 
  // this is the position (x,y) of button 2
  let h2x = -250;
  let h2y = 40;

  // check dist from wrist to button 3
  let h = dist(rightWrist.position.x - 320,
    rightWrist.position.y - 240,
    h2x, h2y);

  if (h < 100) {
    //Button 3
    push();
    translate(h2x, h2y, 0);
    fill("blue");
    strokeWeight(2);
    scale(60);
    model(slider);
    pop();
    if (!song3.isPlaying() && !song3.isPlaying()) {
      song3.play();
    } else {
      song3.stop();
      //end of else
    }
  } else {
    push();
    translate(h2x, h2y, 0);
    fill("CadetBlue");
    strokeWeight(2);
    scale(60);
    model(slider);
    pop();
  }
}
  //END OF SONGPLAYED
}