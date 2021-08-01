var backgroundImage, background, bg;
var rocket, asteroid, asteriodImg;
var rocketimg;
var instructions, instructionsImg;
var music;
var asteroidGroup, asteroidsGroup;
var earth, earthimg;

var gameOver, gameOverImg, reset, restartImg, restart, winner, winImg;
var score;

var PLAY = 1;
var END = 2;
var REST = 0;
var gameState = REST;

function preload(){
  rocketimg = loadImage("Images/rocket.png")
  asteroidImg = loadImage("Images/asteroid.png")
  instructionsImg = loadImage("Images/instructions.png")
  backgroundImage = loadImage("Images/spacebg.png")
  earthimg = loadImage("Images/earth.png")

  gameOverImg = loadImage("Images/gameover.png")
  winImg = loadImage("Images/youwin.png")

  music = loadSound("Sounds/music.mp3")

  restartImg = loadImage("Images/restart.png")
}

function setup() {
  createCanvas(800, 300);

  edges = createEdgeSprites();

  bg = createSprite(800,100,800,300);
  bg.addImage(backgroundImage);
  bg.x = bg.width/2;
  bg.velocityX = -1;

  rocket = createSprite(80,200,20,20);
  rocket.addImage("rocketship", rocketimg);
  rocket.scale = 0.22
  rocket.rotation = rocket.rotation + 120
  //rocket.debug = true;

  asteroidGroup = new Group();
  asteroidsGroup = new Group();

  earth = createSprite(750,50,20,20);
  earth.addImage(earthimg);
  earth.scale = 0.15
  earth.setCollider("circle", 0, 0, 950); 
  // earth.debug = true;

  gameOver = createSprite(400,150,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.3;

  instructions = createSprite(400,150,800,300);
  instructions.addImage(instructionsImg);

  winner = createSprite(400,150,10,10);
  winner.addImage(winImg);
  winner.scale = 0.2;

  restart = createSprite(400,230,10,10)
  restart.addImage(restartImg);
  restart.scale = 0.5

  score = 0;

  music.play();
}

function draw(){

  background("black");

  if(gameState===REST){

    gameOver.visible = false;
    winner.visible = false;
    restart.visible = false;

    if (keyDown("space")){
      instructions.visible = false;
      gameState = PLAY;
  }
}else if(gameState===PLAY){
    

    score = score + Math.round(getFrameRate()/60);

    if (bg.x < 300){
      bg.x=bg.width/2;
    }

    //Go up
    if(keyDown(UP_ARROW)){
      rocket.velocityY = -1;
    }
    
    //Go left
    if(keyDown(LEFT_ARROW)) {
      rocket.velocityX = -1;
    }

    //Go right
    if(keyDown(RIGHT_ARROW)) {
      rocket.velocityX = 1;
    }

    //Go down
    if(keyDown(DOWN_ARROW)) {
      rocket.velocityY = 1;
    }

    if(asteroidsGroup.isTouching(rocket)){
        gameState = END;
        gameOver.visible= true;
        restart.visible = true;
    }
   
    if(asteroidGroup.isTouching(rocket)){
      gameState = END;
      gameOver.visible= true;
      restart.visible = true;
    }

    if(rocket.isTouching(earth)){
      gameState = END;
      winner.visible = true;
      restart.visible = true;
    }

    
    spawnAsteroid();
    spawnAsteroid1();
  }

  else if(gameState === END){

    bg.velocityX = 0;
    rocket.velocityX = 0;
    rocket.velocityY = 0;

    asteroidsGroup.setVelocityXEach(0);
    asteroidGroup.setVelocityXEach(0);

    asteroidsGroup.destroyEach();
    asteroidGroup.destroyEach();

    if(mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();  

  textSize(20);
  fill("#ADD8E6");
  text("Score: "+ score, 50,50);

}


function spawnAsteroid(){
 if (frameCount%160===0){
   asteroid = createSprite(800,100,10,10);
   asteroid.addImage("asteroid",asteroidImg);
   asteroid.velocityX = -4
   asteroid.velocityY = 4
   asteroid.scale = 0.3
  
  //  createEdgeSprites();
  //  asteroid.bounceOff(edges);

  // asteroid.y = Math.round(random(10,290));
   asteroid.x = Math.round(random(100,790));

   asteroid.lifetime = 80;
   asteroidGroup.add(asteroid);

   asteroid.setCollider("circle", 0, 0, 20);
   //asteroid.debug = true;
  }
}

function spawnAsteroid1(){
  if (frameCount%220===0){
    asteroids = createSprite(800,100,10,10);
    asteroids.addImage("asteroid",asteroidImg);
    asteroids.velocityX = -4
    asteroids.velocityY = 4
    asteroids.scale = 0.25
   
   //  createEdgeSprites();
   //  asteroid.bounceOff(edges);
 
   // asteroid.y = Math.round(random(10,290));
    asteroids.x = Math.round(random(100,790));

    asteroids.lifetime = 80;
    asteroidsGroup.add(asteroids);

    asteroids.setCollider("circle", 0, 0, 20); 
    //asteroids.debug = true;
  }
 
 }

 function reset(){
    gameState = PLAY;
    score = 0;

    gameOver.visible = false;
    restart.visible = false;
    winner.visible = false;

    asteroidsGroup.destroyEach();
    asteroidGroup.destroyEach();

    rocket.x = 80
    rocket.y = 200
}