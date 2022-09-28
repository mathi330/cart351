class Circle{
    constructor(x,y,radius,context){
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.localCanvasContext = context;

        //randomize color :)
        this.strokeColor = `rgba(
            0,
            ${Math.floor(Math.random()*230)},
            ${Math.floor(Math.random()*255)},
            200
        )`;

        let possibleSpeedX = ((Math.random() * 1) + .1);
        let possibleSpeedY = ((Math.random() * 1) + .1);
        let directionSpeedX = Math.random();
        let directionSpeedY = Math.random();
        if(directionSpeedX < 0.5){
            this.speedX = -possibleSpeedX;
        } else{
            this.speedX = possibleSpeedX;
        }
        
        if(directionSpeedY < 0.5){
            this.speedY = -possibleSpeedY;
        } else{
            this.speedY = possibleSpeedY;
        }
    }

    display(){

        let thisContext = this.localCanvasContext;
        
        thisContext.beginPath();
        thisContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        thisContext.fillStyle = `rgba(0,0,0,0)`;
        thisContext.fill();
        thisContext.lineWidth = 2;
        thisContext.strokeStyle = this.strokeColor;
        thisContext.stroke();
        thisContext.closePath();

        
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    checkBounds(localCanvas, canvasWidth, canvasHeight){
        let distX = canvasWidth - this.x;
        if(distX < this.radius || this.x < this.radius){
            this.speedX = -this.speedX;
        }

        let distY = canvasHeight - this.y;
        if(distY < this.radius || this.y < this.radius){
            this.speedY = -this.speedY;
        }
    }
}