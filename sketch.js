var ghost, ghostImage;

var tower, towerImage;

var door, doorImage,doorGroup;
var climber, climberImage, invisibleBlock, invisibleBlockGroup, climberGroup;

var gameState="play";

var sound;

function preload(){
  ghostImage=loadImage("ghost-standing.png");
  
  towerImage=loadImage("tower.png");
  
  doorImage=loadImage("door.png");
  
  climberImage=loadImage("climber.png");
  
  sound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  sound.loop();
  
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  
  invisibleBlockGroup = new Group();
  climberGroup = new Group();
  doorGroup = new Group();
  
}

function draw(){
  background("black");
  
  if (gameState==="play"){
  
  if (tower.y>400){
   tower.y=300; 
  }
  
  if (keyDown("space")){
    ghost.velocityY=-10;
  }
  
  ghost.velocityY=ghost.velocityY+0.5;
  
  if (keyDown("left_arrow")){
    ghost.x=ghost.x-2;
  }
  if (keyDown("right_arrow")){
    ghost.x=ghost.x+2;
  }
  
  if (invisibleBlockGroup.isTouching(ghost)){
    ghost.destroy();
    gameState="end";
  }
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
    
    
  spawnDoor();  
  drawSprites();
  }
  
  if (gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 300, 300);
  }
}
  

function spawnDoor(){
  if (frameCount%200===0){
    door=createSprite(200,-50);
    door.addImage(doorImage);
    door.velocityY=1;
    door.x=Math.round(random(120,400))
    
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    climber.x=door.x;
    climber.velocityY=1;
    
    invisbleBlock=createSprite(200,15);
    invisbleBlock.velocityY=1;
    invisbleBlock.x=door.x;
    invisbleBlock.width=climber.width;
    invisbleBlock.height=2;
    invisbleBlock.debug=true;
    
    invisibleBlockGroup.add(invisbleBlock);
    climberGroup.add(climber);
    doorGroup.add(door);
    
    ghost.depth=door.depth;
    ghost.depth+=1
    
  }

  
}

