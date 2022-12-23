const canv = document.querySelector("canvas");
const ctx = canv.getContext('2d');
const score_output = document.getElementById("score_out");
const balls = ["img/green_ball.png", "img/green_ball.png", "img/red_ball.png", "img/yellow_ball.png"];
const basketPath = "img/kosz.png";

let basket_x = canv.width / 2 - 50;
let basket_y = canv.height - 90;


const basket_w = 100;
const basket_h = 90;

let isRightPressed = false;
let isLeftPressed = false;

const speed = 5;

let score = 0;

let basket = new Image();
basket.src = basketPath;

let ball = new Image();

let ball_x = 0;
let ball_y = 0;    

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        isRightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        isLeftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        isRightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        isLeftPressed = false;
    }
}

function drawBall() {
    //image.src = balls[Math.floor(Math.random()*balls.length)];
    

    // while (ball_y != canv.height) {
    //     if (ball_x == basket_x && ball_y == basket_y) {
    //         score++;
    //         image.remove();
    //         break;
    //     }
        
    //     ball_y -= speed;
    // }
    
    ball.src = balls[Math.floor(Math.random() * balls.length)];
    ctx.drawImage(ball, ball_x, ball_y, 70, 100);
}

function isOnEdge() {
    if (basket_x == 0) {
        return "left";
    } else if (basket_x == canv.width - basket_w) {
        return "right";
    }
}

function drawBasket() {
    ctx.beginPath();
    ctx.drawImage(basket, basket_x, basket_y, basket_w, basket_h);
    ctx.fill();
    ctx.closePath();
}

function update() {
    if (isRightPressed && isOnEdge() != "right") {
        basket_x += speed;
    } else if (isLeftPressed && isOnEdge() != "left") {
        basket_x -= speed;
    }

    if (ball_y == 100) {
        ball.src = balls[Math.floor(Math.random() * balls.length)];
        ball_x = Math.floor((Math.random() * (canv.width-70)) + 70)
        while (ball_y != canv.height || ((ball_y != basket_y) || (ball_x != basket_x) )) {
            ball_y += speed;
        }
    } else {
        1;
    }
}

function draw() {
    ctx.clearRect(0, 0, canv.width, canv.height);
    drawBasket();
    drawBall();

    score_output.innerHTML = score.toString();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

loop();