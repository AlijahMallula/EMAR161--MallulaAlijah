
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

//Image Variables
let blue;
let lime;
let teal;
let purple;
let orange;
let yellow;
let red;

function preload() {
  dice = loadModel('button.obj');
  cube = loadModel('cube.obj');
  slider = loadModel('slider.obj');

}


function setup() {


  //load song:

  song = loadSound("Bass.mp3");
  song2 = loadSound("Electro.mp3");
  song3 = loadSound("High Drums.mp3");
  song4 = loadSound("Tron Choir.mp3");
  //load Images:

  blue = loadImage("blue.jpg");
  lime = loadImage("lime.jpg");
  teal = loadImage("teal.jpg");
  purple = loadImage("purple.jpg");
  orange = loadImage("orange.jpg");
  yellow = loadImage("yellow.jpg");
  red = loadImage("red.jpg");

  frameRate(10);

  createCanvas(640, 480, WEBGL);

  video1 = createCapture(VIDEO); //initiate webcam
  video1.size(width, height);


  poseNet = ml5.poseNet(video1, modelReady);

  poseNet.on('pose', function(results) {
    poses = results;
  });

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
  songVolume();
  songPaused();
}

// A function to draw ellipses over the detected keypoints
function songPlayed() {

  if (poses.length >= 1) {

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

    //THIS PLAYS THE FIRST PART
    // this is the position (x,y) of button 1
    let d2x = 110;
    let d2y = 150;

    // check dist from wrist to button 1
    let d = dist(leftWrist.position.x - 320, leftWrist.position.y - 240,
      d2x, d2y);

    if (d < 70) {
      //Button 2
      push();
      translate(d2x, d2y, 0);
      fill("MidnightBlue");
      strokeWeight(2);
      scale(40);
      model(dice);


      pop();
      if (!song.isPlaying()) {
        song.play();
      } else {
        song.stop();
        //end of else
      }
    } else {
      push();
      translate(d2x, d2y, 0);
      texture(blue);
      strokeWeight(2);
      scale(40);
      model(dice);
      pop();
    }



    //THIS PLAYS THE SECOND PART
    // this is the position (x,y) of button 2
    let b2x = -90;
    let b2y = 150;

    // check dist from wrist to button 2
    let f = dist(rightWrist.position.x - 320,
      rightWrist.position.y - 240,
      b2x, b2y);

    if (f < 80) {
      //Button 2
      push();
      translate(b2x, b2y, 0);
      fill("LavenderBlush");
      strokeWeight(2);
      scale(40);
      model(cube);
      pop();
      if (!song2.isPlaying()) {
        song2.play();
      } else {
        song2.stop();
        //end of else
      }
    } else {
      push();
      translate(b2x, b2y, 0);
      //fill("coral");
      texture(lime);
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

    if (h < 80) {
      //Button 3
      push();
      translate(h2x, h2y, 0);
      fill("CadetBlue");
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
      texture(purple);
      strokeWeight(2);
      scale(60);
      model(slider);
      pop();
    }
    //THIS PLAYS THE FOUTH PART: 
    let e2x = 250;
    let e2y = 40;
    // check dist from wrist to button 3
    let e = dist(leftWrist.position.x - 320,
      leftWrist.position.y - 240,
      e2x, e2y);

    if (e < 80) {
      //Button 3
      push();
      translate(e2x, e2y, 0);
      fill("blue");
      strokeWeight(2);
      scale(60);
      model(slider);
      pop();
      if (!song4.isPlaying() && !song4.isPlaying()) {
        song4.play();
      } else {
        song4.stop();
        //end of else
      }
    } else {
      push();
      translate(e2x, e2y, 0);
      // fill("Purple");
      texture(teal);
      strokeWeight(2);
      scale(60);
      model(slider);
      pop();
    }

  }
  //END OF BIG IF STATEMENT    

  //END OF SONGPLAYED
}

function songVolume() {
  if (poses.length >= 1) {
    i = 0;
    //drawing from left hand:
    let leftWrist = poses[i].pose.keypoints[9];
    if (leftWrist.score > 0.1) {
      push();
      fill("Teal");
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

    //Volume DOWN 
    let n2x = 200;
    let n2y = -150;
    let n = dist(leftWrist.position.x - 320,
      leftWrist.position.y - 240,
      n2x, n2y);

    if (n < 80) {

      push();
      translate(n2x, n2y, 0);
      fill("Purple");
      strokeWeight(2);
      scale(40);
      model(dice);
      pop();

      if (!song.isPlaying() && !song2.isPlaying() && !song3.isPlaying() && !song4.isPlaying()) {
        song.setVolume(0.5);
        song2.setVolume(0.5);
        song3.setVolume(0.5);
        song4.setVolume(0.5);
      } else {
        song.setVolume(2.0);
        song2.setVolume(2.0);
        song3.setVolume(2.0);
        song4.setVolume(2.0);
        //end of else
      }
    } else {
      push();
      translate(n2x, n2y, 0);
      //fill("MidnightBlue");
      strokeWeight(2);
      texture(orange);
      scale(40);
      model(dice);
      pop();
    }


    //Volume UP 
    let m2x = -200;
    let m2y = -150;
    let m = dist(rightWrist.position.x - 320,
      rightWrist.position.y - 240,
      m2x, m2y);

    if (m < 80) {

      push();
      translate(m2x, m2y, 0);
      fill("DarkCyan");
      strokeWeight(2);
      scale(40);
      model(cube);
      pop();

      if (!song.isPlaying() && !song2.isPlaying() && !song3.isPlaying() && !song4.isPlaying()) {
        song.setVolume(7.0);
        song2.setVolume(7.0);
        song3.setVolume(7.0);
        song4.setVolume(7.0);
      } else {
        song.setVolume(2.0);
        song2.setVolume(2.0);
        song3.setVolume(2.0);
        song4.setVolume(2.0);
        //end of else
      }
    } else {
      push();
      translate(m2x, m2y, 0);
      //fill("DarkTurquoise");
      texture(yellow);
      strokeWeight(2);
      scale(40);
      model(cube);
      pop();
    }
  }

  //end of songvolume
}

function songPaused() {
  if (poses.length >= 1) {
    i = 0;
    //drawing from left hand:
    let leftWrist = poses[i].pose.keypoints[9];
    if (leftWrist.score > 0.1) {
      push();
      fill("DarkSeaGreen");
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

    //Pause Button 
    let t2x = 0;
    let t2y = -150;
    let t = dist(rightWrist.position.x - 320,
      rightWrist.position.y - 240,
      t2x, t2y);

    if (t < 80) {

      push();
      translate(t2x, t2y, 0);
      fill("DarkSalmon");
      strokeWeight(2);
      scale(20);
      model(cube);
      pop();

      if (!song.isPlaying()) {
        song.pause();
        song2.pause();
        song3.pause();
        song4.pause();

      } else {
        song.pause();
        song2.pause();
        song3.pause();
        song4.pause();

        //end of else
      }
    } else {
      push();
      translate(t2x, t2y, 0);
      texture(red);
      strokeWeight(2);
      scale(20);
      model(cube);
      pop();
    }
  }
}