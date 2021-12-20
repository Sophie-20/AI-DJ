song = "";
leftWristX1 = 0;
leftWristY1 = 0;
rightWristX1 = 0;
rightWristY1 = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
    song = loadSound("music.mp3");

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        // console.log("Score Left Wrist = "+scoreLeftWrist+" Score Right Wrist = "+scoreRightWrist);
        leftWristX1 = results[0].pose.leftWrist.x;
        leftWristY1 = results[0].pose.leftWrist.y;
        rightWristX1 = results[0].pose.rightWrist.x;
        rightWristY1 = results[0].pose.rightWrist.y;

        //  console.log("LeftWrist X = "+leftWristX+"LeftWrist Y = "+leftWristY+"RightWrist X = "+rightWristX+"RightWrist Y = "+rightWristY);
    }


}

function modelLoaded() {
    console.log("Posenet is initailized");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("pink");
    circle(leftWristX1, leftWristY1, 80);
    innumberleftwristy = Number(leftWristY1);
    removedecimals = floor(innumberleftwristy);
    volume = removedecimals / 500;
    document.getElementById("volume").innerHTML = "volume" + volume;
    song.setVolume(volume);

   // if (scoreRightWrist > 0.2) {
        circle(rightWristX1, rightWristY1, 20);
        if (rightWristY1 > 0 && rightWristY1 <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5X";
            song.rate(0.5);
        } 
        else if (rightWristY1 > 100 && rightWristY1 < 200) {
            document.getElementById("speed").innerHTML = "Speed = 1X";
            song.rate(1);
        } 
        else if (rightWristY1 > 200 && rightWristY1 < 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5X";
            song.rate(1.5);
        }
        else if (rightWristY1 > 300 && rightWristY1 < 400) {
            document.getElementById("speed").innerHTML = "Speed = 2X";
            song.rate(2);
        }
        else if (rightWristY1 > 400 && rightWristY1 < 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5X";
            song.rate(2.5);
        }

   // }
}

    function play() {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }