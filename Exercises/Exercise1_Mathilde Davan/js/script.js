window.onload = function(){

    //canvas
    let canvas = document.getElementById(`my-canvas`);
    canvas.width = window.innerWidth - 10;
    canvas.heigth = 400;

    let context = canvas.getContext(`2d`);

    let resultText = "";


    // code from class 3 about HTML5 files

    document.getElementById('inputText').addEventListener('change', readAndHandleTextFile);

    function readAndHandleTextFile(){
        // get the file list ...
        const selectedFileList = this.files;
        const file = selectedFileList[0];
        if (file.type.startsWith('text/')){
            // const pTag = document.createElement("p"); // create a new image element
            // pTag.setAttribute(`id`, `file-text`);``
            const reader = new FileReader();
            //once is read
            reader.addEventListener("load", function () {
                // console.log(reader.result);
                // let pTag = document.getElementById(`file-text`);
                // pTag.innerHTML = reader.result;

                resultText = reader.result;
                

                // append to the document
                // document.getElementById("file-text").appendChild(pTag);
            });
            // to read the file as text
            reader.readAsText(file);
        } //if
    }//event handler



    

    let numCircles = 20;
    let circles = [];

    let numSquares = 40;
    let squares = [];

    for(let i = 0; i < numCircles; i++){
        let radius = (Math.random() * 50) + 15;
        let x = Math.random() * canvas.width;
        if(x - radius < 100 || x + radius > canvas.width - 100){
             x = Math.random() * canvas.width;
        }
        let y = Math.random() * canvas.height;
        if(y - radius < 100 || y + radius > canvas.height - 100){
             y = Math.random() * canvas.height;
        }
        
        circles.push(new Circle(x, y, radius, context));
    }

    for(let i = 0; i < numSquares; i++){
        let size = 100;
        let x = canvas.width / 2 - size / 2;
        let y = canvas.height / 2;
        let angle = 180 / numSquares * i;

        squares.push(new Square(x, y, size, angle, context));
    }


    requestAnimationFrame(animate);
    function animate(){
        context.clearRect(0,0,canvas.width,canvas.height);

        for(let i = 0; i < circles.length; i++){
            circles[i].update();
            circles[i].checkBounds(canvas, canvas.width, canvas.height);
            circles[i].display();
        }

        for(let i = 0; i < squares.length; i++){
            squares[i].display();
            let squareY = squares[i].y + squares[i].size/2;
            console.log("square y position:" + squareY + " canvas height:" + canvas.height);
        }

        
        context.font = "10px Arial";
        context.fillStyle = "#330010";
        context.textAlign = "center";
        context.fillText(resultText, canvas.width/2, canvas.height/2);

        requestAnimationFrame(animate);
    }


    //add a mouseListener to canvas
    canvas.addEventListener("mousemove",canvasIsActive);

    function canvasIsActive(event){

        // calculate the offset
        let pBox = this.getBoundingClientRect();
        // the one we use ...diff
        let mouse_offset_x = Math.floor(event.clientX - pBox.x);
        let mouse_offset_y = Math.floor(event.clientY - pBox.y);

        if(squares[0].translateX + squares[0].size > mouse_offset_x &&
        squares[0].translateX - squares[0].size < mouse_offset_x &&
        squares[0].translateY + squares[0].size > mouse_offset_y &&
        squares[0].translateY - squares[0].size < mouse_offset_y){
            for(let i = 0; i < squares.length; i++){
                squares[i].angle += 0.01;
            }
        }
    }

}