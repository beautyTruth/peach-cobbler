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
    this.enemyInterval = 100;
    this.enemyTimer = 0;
    this.enemyTipi = ["worm", "ghost"];
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
    this.enemies.forEach((boobie) => boobie.update(deltaTime));
  }
  draw() {
    this.enemies.forEach((boobie) => boobie.draw(this.ctx));
  }
  #addNewEnemy() {
    const randomEnemy =
      this.enemyTipi[Math.floor(Math.random() * this.enemyTipi.length)];
    // console.log(randomEnemy);
    if (randomEnemy == "worm") this.enemies.push(new Worm(this));
    else if (randomEnemy == "ghost") this.enemies.push(new Ghost(this));
    // this.enemies.sort((a, b) => a.y - b.y);
  }
}

class Enemy {
  constructor(game) {
    this.game = game;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height;
    this.width = 100;
    this.height = 100;
    this.markedForDeath = false;
  }
  update(deltaTime) {
    this.x -= this.vx * deltaTime;
    // this is where we remove the enemies
    if (this.x < 0 - this.width) this.markedForDeath = true;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Worm extends Enemy {
  constructor(game) {
    super(game);
    this.spriteWidth = 229;
    this.spriteHeight = 171;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = this.game.width;
    this.y = this.game.height - this.height;
    this.image = worm;
    this.vx = Math.random() * 0.1 + 0.1;
  }
}
class Ghost extends Enemy {
  constructor(game) {
    super(game);
    this.spriteWidth = 261;
    this.spriteHeight = 209;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.6;
    this.image = ghost;
    this.vx = Math.random() * 0.2 + 0.1;
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
