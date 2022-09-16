
// setup canvas

const canvas = document.querySelector('canvas');

// call the getContext method to draw 2d shape

const ctx = canvas.getContext('2d');

// set canvas width and height equal to browser viewport

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// makes balls objects and assigns a constructor class

class Ball {
    constructor(x, y, velX, velY, color, size) {
      this.x = x; // horizontal position of the ball
      this.y = y; // vertical position of the ball
      this.velX = velX; // velocity x added to coordinate x when we animate our ball
      this.velY = velY; // velocity y added to coordinate y
      this.color = color; // fill ball shape with given color
      this.size = size; // size is a radius of the ball
    }

    // drawing the ball

    draw() {
        ctx.beginPath(); //start drawing
        ctx.fillStyle = this.color; // fill ball shape with given color

        // x and y is center of the ball
        // size is radius of the ball
        //0 is a start point of degree around radius of the ball
        // 2 * Math.PI is an end point which is equivalent to 360 degree
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); 
        ctx.fill(); // finish drawing
      }

      // update ball's data

      update() {

        // check whether the ball has reached the edge of the canvas. If it has, we reverse the polarity of the relevant velocity to make the ball travel in the opposite direction.
        // if x and y position is greater than or less than browser viewport then balls turn another direction
        if ((this.x + this.size) >= width) {
          this.velX = -(this.velX);
        }
      
        if ((this.x - this.size) <= 0) {
          this.velX = -(this.velX);
        }
      
        if ((this.y + this.size) >= height) {
          this.velY = -(this.velY);
        }
      
        if ((this.y - this.size) <= 0) {
          this.velY = -(this.velY);
        }
      // x and y velocity added to x and y coordinate everytime upDate ball func is called

        this.x += this.velX;
        this.y += this.velY;
      }

      // colision detection

      collisionDetect() {
        for (const ball of balls) {
          if (this !== ball) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
      
            if (distance < this.size + ball.size) {
              ball.color = this.color = randomRGB();
            }
          }
        }
      }
  }

  // create balls and store in an array

  const balls = [];

while (balls.length < 25) { // when we have 25 balls in the array, no more balls will be pushed
  const size = random(10,20);
  const ball = new Ball(


    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

// Animation loop

function loop() {

  // cover the previous frame's drawing before the next one is drawn
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  
    for (const ball of balls) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  
    // lets calls loop func itself over and over again and makes animation smooth
    requestAnimationFrame(loop);
  }

  // call function to get animation started

  loop();


