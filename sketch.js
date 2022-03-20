var canvas;
var backgroundImage, player1_img, player2_img, track;
var gunImage, fireImage, lifeImage;
var obstacle1Image, obstacle2Image;
var database, gameState;
var form, player, playerCount;
var allPlayers, player1, player2, bullets, fires, obstacles, weapon1, weapon2, weapons;
var players = [];

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  player1_img = loadImage("./assets/player1.gif");
  player2_img = loadImage("./assets/player2.png");
 // track = loadImage("../assets/track.jpg");
  bulletImage = loadImage("./assets/bullet1.png");
  fireImage = loadImage("./assets/fire.png");
  obstacleImage = loadImage("./assets/obstacle1.png");
  blastImage = loadImage("./assets/blast.png");
  lifeImage = loadImage("./assets/life.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2 && gameState==0) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
    for (var i = 0; i < players.length; i++) {
      if (i !== (player.index-1))
        weapons[player.index-1].collide(players[i], destroyChar);

      if (players[i].visible === false) {// player was hit by current player
        Player.updateLives(i+1);
        players[i].visible = true;
      }
    }
  }

  if (gameState == 2) {
    game.gameOver();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function destroyChar(weapon,char) {
  console.log("char got attacked!")
  char.visible = false;
  //attacking players updates
  player.weaponx = -1000; player.weapony = -1000;
  game.weaponMovingDir = null;
  weapons[player.index-1].visible = false;
  weapon.x = -1000; weapon.y = -1000;
 
  player.update();
}