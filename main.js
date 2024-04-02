lily_song=""; //Peter_pan_song
water_song=""; //harry potter
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_lily = ""; //song_Peter_pan
song_water = "";  //song_Harry_potter_theme

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    lily_song = loadSound("lily.mp3");
    water_song = loadSound("water.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#7d32a8");
    stroke("#7d32a8");

    song_lily = lily_song.isPlaying();
    console.log(song_lily);

    song_water = water_song.isPlaying();
    console.log(song_water);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        water_song.stop();
        if(song_lily == false){
            lily_song.play();
        }
        else{
            console.log("Song Name: Lily");
            document.getElementById("lily").innerHTML = "Song Name: Lily";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        lily_song.stop();
        if(song_water == false){
            water_song.play();
        }
        else{
            console.log("Song Name: Water");
            document.getElementById("water").innerHTML = "Song Name: Water";
        }
    }
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}