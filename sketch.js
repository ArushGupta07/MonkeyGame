

var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime = 0;  
var score


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation('running',monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  bananaGroup =  createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
}


function draw() {
   //Creating the background
  background('white');
  
  stroke('white');
  textSize(20);
  fill('white')
  text('Score : '+ score,500,50);
  
  stroke('black');
  textSize(20);
  fill('black');
  survivalTime = Math.ceil(frameCount/frameRate());
  text('Survival time : '+ survivalTime,100,50)
  
 
  
    food();
    obstacles();
  
  
  
  //Making the ground infinite
  if(ground.width>0){
    ground.x = 400;
  }
  
  if(keyDown('space') && monkey.y>= 314){
     monkey.velocityY = -20;
     }
  monkey.velocityY = monkey.velocityY + 1.2;
  monkey.collide(ground);
  
  
  
  if(monkey.isTouching(bananaGroup)){
     bananaGroup.destroyEach();
     score = score + 1;
     }
  
  if(monkey.isTouching(obstacleGroup)){
     obstacleGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
     ground.velocityX = 0;
     
     }
  
  drawSprites();
}

function food(){
  if(frameCount%80 === 0){
     banana = createSprite(400,Math.round(random(120,200)),30,30);
    banana.velocityX = -4;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 100;
    bananaGroup.add(banana);
     }
  
}

function obstacles(){
  if(frameCount%300 === 0){
     obstacle = createSprite(400,315,30,30);
     obstacle.velocityX = -4;
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.2;
     obstacle.lifetime = 100;
     obstacleGroup.add(obstacle);
    
     }
}


