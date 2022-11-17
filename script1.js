// variables
let masterPlayButton = document.querySelector("#third-play-pause");
let backwardButton = document.querySelector("#third-backward");
let forwardButton = document.querySelector("#third-forward");
let songsName = Array.from(document.getElementsByClassName("second-song-name"));
let smallPlayPause = Array.from(document.getElementsByClassName("second-icon"));
let songs = [songsName, smallPlayPause];
let rangeBar = document.getElementById("third-range");
let check = true;
let gif = document.querySelector(".third-info-img").style;
let w = 1;
let comeOn = [];
let arrIndex = [];
let arrLast = [];
let arrSub = [];
let backward = document.getElementById("third-backward");
let forward = document.getElementById("third-forward");

// main script
masterPlayButton.addEventListener("click", function () {
  if (arrLast.length == 0) {
    arrLast.push(w);
  }
  if (arrIndex.length == 0) {
    arrIndex.push(1);
  }
  minorPlayPause(w);
});
smallPlayPause.forEach(something);
function something(event, index) {
  event.addEventListener("click", function () {
    if (arrLast[0] != index + 1 && arrLast.length != 0 && comeOn.length != 0) {
      comeOn[0].pause();
      songs[1][arrLast[0] - 1].setAttribute(
        "src",
        "images/circle-play-regular.png"
      );
      comeOn = [];
      check = true;
    }
    arrLast = [];
    arrIndex = [];
    arrIndex.push(index + 1);
    arrLast.push(arrIndex[0]);
    w = arrIndex[0];
    minorPlayPause(arrIndex[0]);
  });
}
forward.addEventListener("click", function () {
  if (arrLast.length != 0 && arrIndex[0] <= 9) {
    arrIndex[0] = arrIndex[0] + 1;
    secondTry();
  }
});
backward.addEventListener("click", function () {
  if (arrLast.length != 0 && arrIndex[0] != 1) {
    arrIndex[0] = arrIndex[0] - 1;
    secondTry();
  }
});

// functions
function minorPlayPause(x) {
  if (x != 1){
    backward.style.opacity = 1;
  } else {
    backward.style.opacity = 0.10;
  }
  if (x == 10){
    forward.style.opacity = 0.10;
  } else {
    forward.style.opacity = 1;
  }
  if (comeOn.length == 0 || arrSub[0] != x) {
    arrSub = [];
    arrSub.push(x);
    comeOn = [];
    var audio = new Audio("songs/" + x + ".mp3");
    comeOn.push(audio);
  }
  if (rangeBar.value != 0 && comeOn[0].currentTime != 0) {
    comeOn[0].currentTime =
      Math.floor(rangeBar.value * comeOn[0].duration) / 100;
  }
  comeOn[0].addEventListener("timeupdate", function () {
    let songPercent = Math.round(
      (comeOn[0].currentTime / comeOn[0].duration) * 100
    );
    rangeBar.value = songPercent;
    if (comeOn[0].currentTime == comeOn[0].duration) {
      firstTry(x);
    }
  });
  if (check == true) {
    check = false;
    comeOn[0].play();
    masterPlayButton.setAttribute("src", "images/circle-pause-regular.png");
    songs[1][x - 1].setAttribute("src", "images/circle-pause-regular.png");
    let trackName = songs[0][x - 1].textContent;
    document.querySelector(".third-title").textContent = trackName;
    gif.opacity = 100;
  } else {
    check = true;
    firstTry(x);
  }
}
rangeBar.addEventListener("click", (v) => {
  comeOn[0].currentTime = (v.target.value / 100) * comeOn[0].duration;
});
function firstTry(u) {
  comeOn[0].pause();
  gif.opacity = 0;
  masterPlayButton.setAttribute("src", "images/circle-play-regular.png");
  songs[1][u - 1].setAttribute("src", "images/circle-play-regular.png");
}
function secondTry() {
  w = arrIndex[0];
  comeOn[0].pause();
  songs[1][arrLast[0] - 1].setAttribute(
    "src",
    "images/circle-play-regular.png"
  );
  comeOn = [];
  arrLast = [];
  arrLast.push(arrIndex[0]);
  check = true;
  minorPlayPause(arrIndex[0]);
}
