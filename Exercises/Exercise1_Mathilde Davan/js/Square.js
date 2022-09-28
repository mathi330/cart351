class Square{
    constructor(x, y, size, angle, context){
        this.x = 0;
        this.y = 0;

        this.translateX = x;
        this.translateY = y;
        this.size = size;

        this.localCanvasContext = context;

        // this.rotationSpeed = 0;
        this.angle = angle;
    }

    display(){
        let thisContext = this.localCanvasContext;

        thisContext.save();
        thisContext.translate(this.translateX, this.translateY);
        thisContext.rotate(this.angle);
        

        thisContext.fillStyle = `rgba(255,255,255,0.5)`;
        thisContext.lineWidth = 2;
        thisContext.fillRect(this.x,this.y,this.size,this.size);

        thisContext.restore();

    }
}