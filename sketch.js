// Warden of Colony V
// Andrew Bertrand
// 4/5/2019

class Enemy{
  constructor(x, aList, aColour, aSpeed, aHealth, aGrid) {
    this.x = x;
    this.y = aList;
    this.color = aColour;
    this.speed = aSpeed; 
    this.health = aHealth;
    this.list = aGrid;
  }
  display(){
    fill(this.color);
    ellipse(this.x, this.y*100 + 300, 40, 40);
  }
  move() {
    this.x -= this.speed;
  }

  attack(){
    this.list[this.y][floor(this.x/100)-4] = 0;
  }
}

class Structure {
  constructor(aType, x, y, aList){
    this.type = aType;
    this.x = x*100;
    this.row = y*100;
    this.buffer = 250;
    this.list = aList;
  }

  show(){
    if (this.type === 1){
      fill(50, 50, 50);
      rect(this.x, this.row, 50, 50);
    }
    if (this.type === 2){
      fill(255, 0, 0);
      rect(this.x, this.row, 75, 25);
    }
    if (this.type === 3){
      fill(0, 150, 150);
      rect(this.x, this.row, 25, 75);
    }
    if (this.type === 4){
      fill(150, 150, 0);
      rect(this.x, this.row, 80, 80);
    }
  }
  work(){
    if(this.buffer >= 0){
      this.buffer--;
    }
    else{
      if(this.type === 1){
        this.buffer = 500;
        this.buffer = 250;
        scrap += 10;
      }
      if(this.type === 2){
        this.buffer = 250;
        if(this.list.length !== 0){
          bulletList.push(new Bullet(this.list, this.x, this.row));
        }
      }
    }
  }
}

class Bullet{
  constructor(aList, aX, aY){
    this.list = aList;
    this.X = aX;
    this.Y = aY;
    this.speed = 5;
  }
  move(){
    this.X += this.speed;
    for(let i = 0; i < this.list.length; i++){
      if(this.X > this.list[i].X){
        this.list[i].damage(1);
      }
    }
  }
  display(){
    fill(150);
    ellipse(this.X, this.Y, 25, 25);
  }
}

// makes the grid
let grid = [];
let lane1 = [];
let lane2 = [];
let lives = 5;
// location of the cursor
let cursorX = 0, cursorY = 0;
// list of deployables on the grid
let defenceGrid =[];
let defenceLane1 = [];
let defenceLane2 = [];
let defenceLane3 = [];
let defenceLane4 = [];
let defenceLane5 = [];
let selectedTower = 1;
let price, scrap;
let pusher;
// list of enemies on the grid
let enemyGrid = [];
let enemyList1 = [];
let enemyList2 = [];
let enemyList3 = [];
let enemyList4 = [];
let enemyList5 = [];
let enemyWave = [];
let bulletList = [];
let timer = 0;
let buffer = 200;
let waveBuffer = 200;
let anotherBuffer;
let selected;
// controls the rest of the game, and menu system
let menu = "start";
let level, wave;
let type;
let buttonX1, buttonX2, buttonY1, buttonY2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  anotherBuffer = random(200, 500);
  anotherBuffer = random(300, 500);
  defenceLane1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  defenceLane2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  defenceLane3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  defenceLane4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  defenceLane5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  defenceGrid = [defenceLane1, defenceLane2, defenceLane3, defenceLane4, defenceLane5];
  enemyGrid = [enemyList1, enemyList2, enemyList3, enemyList4, enemyList5];
  buttonX1 = windowWidth/1.5;
  buttonX2 = windowWidth/3;
  buttonY1 = windowHeight/2;
  buttonY2 = windowHeight/2; 
  for(let i = random(19, 30); i > 0; i--){
    if(enemyWave.length > 8){
      enemyWave.push(floor(random(1, 4)));
    }
    else if(enemyWave.length > 4){
      enemyWave.push(floor(random(1, 3)));
    }
    else{
      enemyWave.push(1);
    }
  }
}
function draw() {
  cursor(CROSS);
  background(220);
  displayMenu();
  checkMenu();
  cursorX = round(mouseX/100);
  cursorY = round(mouseY/100);
  if (selectedTower === 1){
    price = 20;
  }
  else if (selectedTower === 2){
    price = 50;
  }
  else if (selectedTower === 3){
    price = 40;
  }
  else if (selectedTower === 4){
    price = 40;
  }
  else if (selectedTower === 0){
    price = 0;
  }
}
function checkMenu(){
  if (mouseIsPressed && menu === "start" && mouseX >= buttonX1 - 125 && mouseX <= buttonX1 + 125 && mouseY >= buttonY1 - 50 && mouseY <= buttonY1 + 50){
    menu = "game";
    type = "campain";
    scrap = 200;
  }
  else if (mouseIsPressed && menu === "start" && mouseX >= buttonX2 - 125 && mouseX <= buttonX2 + 125 && mouseY >= buttonY2 - 50 && mouseY <= buttonY2 + 50){
    menu = "game";
    type = "endless";
    scrap = 50;
  }
}
function displayMenu(){
  if (menu === "start"){
    textSize(30);
    fill(10, 200, 10);
    rectMode(CENTER);
    rect(buttonX1, buttonY1, 250, 100);
    rect(buttonX2, buttonY2, 250, 100);
    fill(0);
    textAlign(CENTER);
    text("Campain", buttonX1, buttonY1);
    text("Endless", buttonX2, buttonY2);
    textAlign(LEFT);
    textSize(32);
    text("welcome player, you are the warden of colony V, a prison full of 'impures' sent to a distant plannet by a cult leader fighting a 'holy war'. As warden it is your job to protect them, you have full access to the defence grid arsinal. Good luck warden", windowWidth/2, 200, 1000, 200);
    text("press 1 - 4 to select towers, 5 erases the current slot, tower 1 produces scrap, tower 2 shoots enemies, tower 3 pushes enemies, tower 4 damages enemies that stand on it, last untill the waves stop", windowWidth/2, 800, 1500, 200);
  }
  if (menu === "end"){
    fill(0);
    text("Game Over", windowWidth/2, 200, 1000, 300);
  }
  if (menu === "game"){
    lane1 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
    lane2 = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
    grid = [lane1, lane2, lane1, lane2, lane1];
    fill(50, 100, 50);
    rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    fill(100, 100, 100);
    rect(850, 0, 1000, 500);
    textAlign(CENTER);
    fill(0);
    text("Scrap " + scrap, 200 , 100);
    text("Price " + price, 200 , 150);
    text("Lives Left " + lives, 200 , 200);
    if (selectedTower === 1){
      fill(50);
      rect(200, 250 , 50, 50);
    }
    if (selectedTower === 2){
      fill(255, 0, 0);
      rect(200, 250, 75, 25);
    }
    if (selectedTower === 3){
      fill(0, 150, 150);
      rect(200, 250, 25, 75);
    }
    if (selectedTower === 4){
      fill(150, 150, 0);
      rect(200, 250, 80, 80);
    }
    if (selectedTower === 0){
      text("Remove", 200, 250);
    }

    if(lives < 0){
      menu = "end";
    }

    // displayes Grid
    for (let i = 0; i < grid.length; i++){
      for (let j = 0; j < lane1.length; j++){
        if (grid[i][j] === 0){
          fill(200, 0, 150);
        }
        if (grid[i][j] === 1){
          fill(150, 0, 200);
        }
        rect(j*100 + 400, i*100 + 300, 100, 100);
      }
    }
    fill(255, 255, 0);
    if (mouseX > 350 && mouseX < 1350 && mouseY > 250 && mouseY < 750){
      rect(cursorX*100-45, cursorY*100-45, 10, 10);
      rect(cursorX*100+45, cursorY*100-45, 10, 10);
      rect(cursorX*100+45, cursorY*100+45, 10, 10);
      rect(cursorX*100-45, cursorY*100+45, 10, 10);
    } 
    for (let j = 0; j < defenceGrid.length; j++){
      for (let i = 0; i < defenceLane1.length; i++){
        if (defenceGrid[j][i] !== 0){
          defenceGrid[j][i].show();
          defenceGrid[j][i].work();
        }
      }
    }
    if(bulletList.length !== 0){
      for(let i = 0; i < bulletList.length; i++){
        bulletList[i].move();
        bulletList[i].display();
      }
    }
    enemyController();
  }
}

function enemyController(){
  if (waveBuffer >= 0){
    waveBuffer--;
  }
  else{
    for(let j = 0; j < enemyGrid.length; j++){
      for(let i = 0; i < enemyGrid[j].length; i++){
        if (enemyGrid[j].length > 0){
          if (enemyGrid[j][i].health <= 0){
            enemyGrid[j].splice(i, 1);
          }
          else{
            enemyGrid[j][i].move();
            enemyGrid[j][i].display();
            if(floor(enemyGrid[j][i].x/100) <= 0){
              lives--;
              enemyGrid[j].splice(i, 1);
            }
            if(floor(enemyGrid[j][i].x/100)-3 >= 0 && floor(enemyGrid[j][i].x/100)-3 <= 9 && defenceGrid[enemyGrid[j][i].y][floor(enemyGrid[j][i].x/100)-3] !== 0 && defenceGrid[enemyGrid[j][i].y][floor(enemyGrid[j][i].x/100)-3].type !== 4){
              defenceGrid[enemyGrid[j][i].y][floor(enemyGrid[j][i].x/100)-3] = 0;
            }
          }
        }  
      }
    }
    anotherBuffer--;
    if (anotherBuffer <= 0){
      pusher = floor(random(0, 5));
      selected = enemyWave.shift();
      if (selected === 1){
        enemyGrid[pusher].push(new Enemy(1500, pusher, "red", 0.5, 5, defenceGrid));
      }
      if (selected === 2){
        enemyGrid[pusher].push(new Enemy(1500, pusher, "blue", 1, 3, defenceGrid));
      }
      if (selected === 3){
        enemyGrid[pusher].push(new Enemy(1500, pusher, "grey", 0.25, 10, defenceGrid));
      }
      anotherBuffer = random(100, 300);
    }
  }
}

function mousePressed(){
  if (mouseX > 350 && mouseX < 1350 && mouseY > 250 && mouseY < 750 &&  menu === "game" && scrap >= price && (defenceGrid[cursorY-3][cursorX-4] === 0 || selectedTower === 0)){
    if(selectedTower === 0){
      defenceGrid[cursorY-3][cursorX-4] = 0;
    }
    else {
      defenceGrid[cursorY-3][cursorX-4] =  new Structure(selectedTower, cursorX, cursorY, enemyGrid[cursorY-3]);
      scrap = scrap - price;
    }
  } 
}
function keyPressed(){
  if (key === "1"){
    selectedTower = 1;
  }
  if (key === "2"){
    selectedTower = 2;
  }
  if (key === "3"){
    selectedTower = 3;
  }
  if (key === "4"){
    selectedTower = 4;
  }
  if (key === "5"){
    selectedTower = 0;
  }
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
}