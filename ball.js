const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height =innerHeight;

console.log(canvas.height , canvas.width);

const colors = ['#2185C5', '#7ECEFD', '#6506E5', '#FF7F66' ,'#4286f4','#8f41f4','#f441a9','#88f441','#293851','#BADA55','#34d899'];


function pickRandomColor(colors){
    return Math.floor(Math.random() * colors.length);
}
function pickFromRange(min,max){
    return Math.floor((Math.random() * (max - min)) + min);
}

function Ball(x, y,dx,dy,radius, color) {
    this.x = x;
    this.y = y;
    this.initialx = x;
    this.initialy = y;
    this.dy=dy;
    this.dx=dx;
    this.round=0;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI;
    // this.radians = Math.PI/6;
}

Ball.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
};

Ball.prototype.moveI = function() {
  if ((this.y + this.radius) >= (this.initialy + 500) ){
    this.round = 1;
    this.dy = -this.dy;
  }
  if(((this.y - this.radius) < this.initialy) && (this.round > 0)){
    this.round =0;
    this.dy = -this.dy;
  }


  this.y += this.dy;

  this.draw();
}

Ball.prototype.moveTTop = function(){
  if(((this.x + this.radius ) >= (this.initialx + 200))){
    this.round+=1;;
    this.dx = - this.dx;
  }
  if(((this.x - this.radius) < (this.initialx)) && (this.round > 0)){
    this.round = 0;
    this.dx= -this.dx;
  }
  this.x+=this.dx;

  this.draw();
}

Ball.prototype.moveALeft = function(xlimit,ylimit){
  //Math.hypot to be explored
  //Math.PI * theta / 180.0 degree theta to radian
  if( ( (this.y + this.radius) >= (this.initialy + ylimit) ) ||((this.initialx - this.x) > xlimit) ){
    // console.log(this.x);
    this.round = 1;
    this.dx= -this.dx;
    this.dy = -this.dy;
  }
  if(((this.y - this.radius) < this.initialy) && (this.round > 0)){
    this.round =0;
    this.dx= -this.dx;
    this.dy = -this.dy;
  }
  this.x =this.x - this.dx*(Math.sin(this.radians)) ;
  this.y = this.y + this.dy*(Math.sin(this.radians));

  this.draw();
}
Ball.prototype.moveARight = function(xlimit,ylimit){
  if( ((this.y + this.radius) >= (this.initialy + ylimit)) || ((this.x - this.initialx) > xlimit) ){
    this.round = 1;
    this.dx= -this.dx;
    this.dy = -this.dy;
  }
  if(((this.y - this.radius) < this.initialy) && (this.round > 0)){
    this.round =0;
    this.dx= -this.dx;
    this.dy = -this.dy;
  }
  this.x =this.x + this.dx*(Math.sin(this.radians)) ;
  this.y = this.y + this.dy*(Math.sin(this.radians));

  this.draw();
}

let ballIArray = [];
let ballTTopArray = [];
let ballTIArray = [];
let ballALeftArray =[];
let ballARightArray = [];

let ballWTopLeftAraay = [];
let ballWTopRightAraay = [];
let ballWBottomLeftAraay = [];
let ballWBottomRightAraay = [];

let ballSTopArray = [];
let ballSMiddleArray = [];
let ballSBottomArray = [];

let xaxis =0;

function init() {

  xaxis += 350;
  let y = 100;
  let radi = 10;

  for (var i = 0; i < 250; i++) {
    ballSTopArray.push(new Ball(250,100,2,2,pickFromRange(10,15),colors[pickRandomColor(colors)]));
  }
  for (var i = 0; i < 250; i++) {
    ballSMiddleArray.push(new Ball(100,250,2,2,pickFromRange(10,15),colors[pickRandomColor(colors)]));
  }

  for (var i = 0; i < 250; i++) {
    ballSBottomArray.push(new Ball(250,400,2,2,pickFromRange(10,15),colors[pickRandomColor(colors)]));
  }

  for (var i = 0; i < 250; i++) {
    ballWTopLeftAraay.push(new Ball(300,y,2,2,pickFromRange(10,15),colors[pickRandomColor(colors)]));
  }

  for (var i = 0; i < 250; i++) {
    ballWBottomLeftAraay.push(new Ball(600,y+140,2,2,pickFromRange(10,15),colors[pickRandomColor(colors)]));
  }
  for (var i = 0; i < 250; i++) {
    ballWBottomRightAraay.push(new Ball(600,y+140,2,2,pickFromRange(10,15),colors[pickRandomColor(colors)]));
  }

  for (var i = 0; i < 250; i++) {
    ballWTopRightAraay.push(new Ball(900,y,2,2,pickFromRange(10,15),colors[pickRandomColor(colors)]));
  }

  for (var i = 0; i < 250; i++) {
    ballALeftArray.push(new Ball(600,y,2,2,pickFromRange(10,15),colors[pickRandomColor(colors)]));
  }

  for (var i = 0; i < 250 ; i++) {
    ballARightArray.push(new Ball(600,y,2,2,pickFromRange(10,15),colors[pickRandomColor(colors)]));
  }

  for (var i = 0; i < 250; i++) {
    ballTTopArray.push(new Ball(800,y,pickFromRange(2,10),pickFromRange(2,5),pickFromRange(10,15),colors[pickRandomColor(colors)]));
  }

  for (var i = 0; i < 250; i++) {
    ballTIArray.push(new Ball(900,y,pickFromRange(2,5),pickFromRange(2,10),pickFromRange(10,15),colors[pickRandomColor(colors)]));
  }

  for (var i = 0; i < 250; i++) {
    ballIArray.push(new Ball(1100, y,pickFromRange(2,5),pickFromRange(2,10),pickFromRange(10,15) , colors[pickRandomColor(colors)]))
  }

}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255,255,255,0.05)';
    c.clearRect(0, 0, canvas.width, canvas.height);

    ballSTopArray.map(ballSTop => {
      ballSTop.moveALeft(150,200);
    });

    ballSMiddleArray.map(ballSMiddle => {
      ballSMiddle.moveARight(150,200);
    });

    ballSBottomArray.map(ballSBottom => {
      ballSBottom.moveALeft(150,200);
    });

    ballWTopLeftAraay.map(ballWTopLeft => {
      ballWTopLeft.moveARight(200,500);
    });

    ballWTopRightAraay.map(ballWTopRight => {
      ballWTopRight.moveALeft(200,500);
    });

    ballWBottomLeftAraay.map(ballWBottomLeft => {
      ballWBottomLeft.moveALeft(70,200);
    });

    ballWBottomRightAraay.map(ballWBottomRight => {
      ballWBottomRight.moveARight(70,200);
    });

    ballALeftArray.map(ballALeft=>{
      ballALeft.moveALeft(300,500);
    });

    ballARightArray.map(ballARight =>{
      ballARight.moveARight(300,500);
    });

    ballTTopArray.map(ballTTop =>{
      ballTTop.moveTTop();
    });

    ballTIArray.map(ballTI=>{
      ballTI.moveI();
    });

    ballIArray.map(ballI =>{
      ballI.moveI();
    });


}

init();
animate();
