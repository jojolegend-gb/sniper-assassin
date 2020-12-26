var boss, boss_run, ground, groundImg1, groundImage2, rip, RIP;
var gameState = 'play1';
var enemy1, enemyImage1, enemy2, enemyImage2;
var score = 0;
var sniper, scopeImg, sniperSound, crosshair, cImg;
var guli, guliImg, bgSound;
var eGroup;

function preload() {
  groundImage2 = loadImage("grass.png");
  bgSound = loadSound("lost.wav");
  sniperSound = loadSound("AWM.mp3");
  boss_run = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png");
  groundImg = loadImage("rad.jpg");
  sniperImg = loadImage("snip.png");
  enemyImage1 = loadImage("enemy1.png");
  enemyImage2 = loadImage("Chor.png");
  cImg = loadImage("reddot.png");
  rip = loadImage("bhoot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  eGroup = new Group();
  eGroup2 = new Group();
  boss = createSprite(50, height - 42, 20, 20);
  boss.addAnimation("hello", boss_run);
  boss.scale = 0.15;
  ground = createSprite(width / 2, height + 285, width + 800, 10);
  ground.addImage(groundImg);
  ground.velocityX = -10;
  sniper = createSprite(50, 50, 20, 20);
  sniper.addImage(sniperImg);
  sniper.scale = 4;
  crosshair = createSprite(200, 200, 10, 10);
  crosshair.addImage(cImg);
  crosshair.scale = 0.05;

}


function draw() {

  if (gameState === 'play1') {
    background("white");
    spawnEnemy();
    fill("black");
    text("Enemies killed: " + score, width / 2 - 20, height / 2);
    ground.velocityX = -8;
    sniper.x = mouseX;
    sniper.y = mouseY;
    crosshair.x = mouseX;
    crosshair.y = mouseY;
    //boss.collide(ground);   
    if (((eGroup.isTouching(boss)))) {
      gameState = 'end';
    }
    if (ground.x < 400) {
      ground.x = ground.width / 2;
    }
    if (crosshair.isTouching(eGroup)) {
       if (keyDown("space")) {
        sniperSound.play();
        eGroup.destroyEach();
        score = score + 1;
        RIP = createSprite(crosshair.x, crosshair.y, 10, 10);
        //RIP.debug=true;
        RIP.setCollider('rectangle', 0, 0, RIP.width, RIP.height);
        RIP.addImage(rip);
        RIP.scale = 0.1;
        RIP.velocityX = -4;
        RIP.velocityY = -4;
        RIP.depth = sniper.depth - 1;
     }
    }
    drawSprites();
    if (score === 1) {
      background("black");
      fill("white");
      strokeWeight(25);
      textSize(25);
      text("GREAT JOB IN CLEARING LEVEL 1!!!!", width / 2 - 125, height / 2 - 50);
      text("ENTERING LEVEL 2!!!!", width / 2 - 125, height / 2);
      text("PRESS ENTER TO START",width/2-128,height/2+50)
      if(keyDown("enter")){
      score = 0;
      gameState = "level2";
    }}
    } else if (gameState === 'end') {
    background("black");
    fill("white");
    strokeWeight(25);
    textSize(25);
    text("YOU ARE WORTHLESS!!!!", width / 2 - 125, height / 2);
  } else if (gameState === 'level2') {
    
    background("white");
    fill("black");
    text("Enemies killed: " + score, width / 2 - 20, height / 2);
    spawnRival();
    ground.velocityX = -12;
    sniper.x = mouseX;
    sniper.y = mouseY;
    crosshair.x = mouseX;
    crosshair.y = mouseY;
    //boss.collide(ground);   
    if (score != 1 && ((eGroup2.isTouching(boss)) || (crosshair.isTouching(boss) && (keyDown("space"))))) {
      gameState = 'end';
    }
    if (ground.x < 400) {
      ground.x = ground.width / 2;
    }
    if (crosshair.isTouching(eGroup2)) {
      if (keyDown("space")) {
        sniperSound.play();
        eGroup2.destroyEach();
        score = score + 1;
        RIP = createSprite(crosshair.x, crosshair.y, 10, 10);
        //RIP.debug=true;
        RIP.setCollider('rectangle', 0, 0, RIP.width, RIP.height);
        RIP.addImage(rip);
        RIP.scale = 0.1;
        RIP.velocityX = -4;
        RIP.velocityY = -4;
        RIP.depth = sniper.depth - 1;
      }
    }
    drawSprites();
  }
}

function spawnEnemy() {
  if (frameCount % 250 == 0) {
    enemy = createSprite(width - 30, height - 40, 20, 20);

    enemy.addImage(enemyImage1);
    enemy.scale = 0.25;
    enemy.velocityX = -10;
    enemy.setCollider('rectangle', 0, 0, 45, enemy.height);
    //enemy.debug=true;
    enemy.depth = sniper.depth - 1;
    eGroup.add(enemy);
  }
}

function spawnRival() {
  if (frameCount % 150 == 0) {
    enemy2 = createSprite(width - 30, height - 45, 20, 20);

    enemy2.addImage(enemyImage2);
    enemy2.scale = 0.20;
    enemy2.velocityX = -14;
    enemy2.setCollider('rectangle', 0, 0, 1500, enemy2.height);
    //enemy.debug=true;
    enemy2.depth = sniper.depth - 1;
    eGroup2.add(enemy2);
  }
}