const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let score;//점수 
let screTxt;//현재 점수 텍
let hghscore;
let hghTxt;
let dino;
let grav;//중력
let obst = [];//장애물
let gamespd;//속도
let keys = {};//키값


document.addEventListener('keydown', function (evt) {
    keys[evt.code] = true;
});//키입력받는애

document.addEventListener('keyup', function (evt) {
    keys[evt.code] = false;
});
class Dino {//객체 붕어빵 틀
    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;

        this.dy = 0; //점프했는가
        this.jumpForce = 15;
        this.orgHeight = h;//원래 높이
        this.jumptm = 0;//쿨탐
    }

    Draw() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
    }

    Jump() {
        if (this.grounded && this.jumptm == 0) {
            this.jumptm = 1;
            this.dy = -this.jumpForce;
        }
        else if (this.jumptm > 0 && this.jumptm < 15) {
            this.jumptm++;
            this.dy = -this.jumpForce - (this.jumptm / 50);
        }
    }


    Animate() {
        if (keys['Space'] || keys['KeyW']) {
            this.Jump();
        }
        else {
            this.jumptm = 0;
        }

        if (keys['ShiftLeft'] || keys['KeyS']) {
            this.h = this.orgHeight / 2;
        }
        else {
            this.h = this.orgHeight;
        }

        this.y+=this.dy;

        if (this.y + this.h < canvas.height) {
            this.dy += grav;
            this.grounded = false;
        }
        else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }

        //this.y+=this.dy; <점프에서 중력사용할때 이미 해줌

        this.Draw();
    }


}
function Start() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.font = "20px sans-serif";

    gamespd = 3;
    grav = 1;

    score = 0;
    hghscore;

    dino = new Dino(25, canvas.height - 150, 50, 50, "Crimson");
    requestAnimationFrame(Update);
}


function Update() {
    requestAnimationFrame(Update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dino.Animate();
    dino.x++;

}
Start();

