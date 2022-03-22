// Aim for excellence, not perfection
// document.addEventListener("load", function () {

// });

// document.addEventListener("DOMContentLoaded", function () {

// });

const canvas = document.querySelector("#icythein");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 800;

class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.enemies = [];
    this.enemyInterval = 1000;
    this.enemyTimer = 0;
  }
  update(deltaTime) {
    this.enemies = this.enemies.filter((boobie) => !boobie.markedForDeath);
    if (this.enemyTimer > this.enemyInterval) {
      this.#addNewEnemy();
      this.enemyTimer = 0;
      console.log(this.enemies);
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((boobie) => boobie.update());
  }
  draw() {
    this.enemies.forEach((boobie) => boobie.draw(this.ctx));
  }
  #addNewEnemy() {
    this.enemies.push(new Worm(this));
  }
}

class Enemy {
  constructor(game) {
    this.game = game;
    // console.log(this.game);
    this.x = this.game.width;
    this.y = Math.random() * this.game.height;
    this.width = 100;
    this.height = 100;
    this.markedForDeath = false;
  }
  update() {
    --this.x;
    // this is where we remove the enemies
    if (this.x < 0 - this.width) this.markedForDeath = true;
  }
  draw(ctx) {
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Worm extends Enemy {
  constructor(game) {
    super(game);
    this.x = this.game.width;
    this.y = Math.random() * this.game.height;
    this.width = 200;
    this.height = 100;
    this.image = worm;
    console.log(this.image);
  }
}

const game = new Game(ctx, canvas.width, canvas.height);
let lastTime = 1;
function animate(timeStamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  game.update(deltaTime);
  game.draw();
  requestAnimationFrame(animate);
}

animate(0);

// skeleton completed March 15, 2022
