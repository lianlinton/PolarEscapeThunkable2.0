var PLAY=1;
var END=0;
var gamestate= "PLAY";

var foxImage,iceCubeImgae, penguinImage, puddleImage, sealImage,gameoverimage;
var backImage,backgr;
var player, player_running, player_stopping;
var ground,ground_img;

var Group;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;
var count;


function preload(){
  backImage=loadImage("background.jpg");
  
  player_running = loadAnimation("p1.png","p2.png","p3.png","p4.png","p5.png","p6.png","p7.png","p8.png");
  
  player_stopping=loadImage("p1.png");
  
  foxImage = loadImage("fox.png");
  iceCubeImage = loadImage("iceCube.png");
  penguinImage = loadImage("penguin.png");
  puddleImage = loadImage("puddle.png");
  sealImage = loadImage("seal.png");
  gameoverimage = loadImage ("gameover.png");
  
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  backgr=createSprite(displayWidth*2, displayHeight-750,displayWidth,displayHeight);
  backgr.addImage(backImage);
  backgr.scale=displayWidth*0.003;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(displayWidth/2-700,displayWidth/2,100,300);
  player.addAnimation("Running",player_running);
  player.scale = displayWidth*0.00078125;
  
  ground = createSprite(displayWidth/2,displayWidth/2,displayWidth,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  
  gameOver = createSprite(displayWidth/2 +200, displayWidth/2 -550);
  gameOver.addAnimation("gameOver", gameoverimage);
  gameOver.scale = displayWidth*0.00035;
  gameOver.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(173, 216, 230);
  
  if(gamestate=== "PLAY"){
     
    score = Math.round(frameCount/4);

    if(keyDown("space") && touches.length > 0) {
      player.velocityY = -12;
      touches = [];
    }
    
    player.velocityY = player.velocityY + 0.8;
    spawnObstacles();
     
    if(ground.x<0) {
      ground.x=ground.width/2;
    }
    
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }

    if (score > 500 || player.isTouching(obstaclesGroup)){
      gamestate = "END";
      if (player.isTouching(obstaclesGroup)){
        count = true;
      }
    }
  }
  
  if (gamestate=== "END"){
    backgr.velocityX = 0;
    ground.velocityX = 0;
    player.velocityX = 0;
    player.addImage("player_stop", player_stopping);
    obstaclesGroup.setVelocityXEach(0);
    gameOver.visible = true;
    /*var GameOver=createSprite(300,120,40,10);
    GameOver.addImage(gameoverimage);
    GameOver.scale=0.2;
    */
  }
  
  player.collide(ground);
  
  drawSprites();
  
  textSize(displayWidth*0.02);
  stroke("blue");
  fill("blue");
  text("Score: "+ score, 600,50);
  if (score > 500){
    textSize(displayWidth*0.02);
    stroke("white");
    fill("white");
    text("You won! Congratulations!", displayWidth/2-100, displayWidth/2 -425);
    text("You saved the polar bear!", displayWidth/2-100, displayWidth/2 -350);
  }
  if (count === true){
    textSize(displayWidth*0.02);
    stroke("white");
    fill("white");
    text("Don't worry! Try again, next time!", displayWidth/2+100, displayWidth/2 -425);  
  }
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(displayWidth/2+800,displayWidth/2,10,40);
    obstacle.setCollider("rectangle",2,2,4,4)  
    obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,4));
     
    switch(rand) {
      case 1: obstacle.addImage(iceCubeImage);
              obstacle.scale = displayWidth*0.00015;
              break;
      case 2: obstacle.addImage(puddleImage);
              obstacle.scale = displayWidth*0.0005 ;
              break;
      case 3: obstacle.addImage(penguinImage);
              obstacle.scale = displayWidth*0.00075;
              break;
      case 4: obstacle.addImage(sealImage);
              obstacle.scale = displayWidth*0.00001;
              break;
      case 5: obstacle.addImage(foxImage);
              obstacle.scale = displayWidth*0.00001;
              break;
      default: break;
    }
     
    obstacle.lifetime = 5000;
     
    obstaclesGroup.add(obstacle);
  }
}
