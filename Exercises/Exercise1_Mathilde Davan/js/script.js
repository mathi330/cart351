window.onload = function(){
    // code from class 3 about HTML5 files

    document.getElementById('inputText').addEventListener('change', readAndHandleTextFile);

    let textFileContent = [];

    function readAndHandleTextFile(){
        // get the file list ...
        const selectedFileList = this.files;
        const file = selectedFileList[0];
        if (file.type.startsWith('text/')){
            const pTag = document.createElement("p"); // create a new image element
            const reader = new FileReader();
            //once is read
            reader.addEventListener("load", function () {
                // console.log(reader.result);
                pTag.textContent = reader.result;
                textFileContent.push(reader.result);
                // append to the document
                document.getElementById("resText").appendChild(pTag);
            });
            // to read the file as text
            reader.readAsText(file);
        } //if
    }//event handler

    console.log(textFileContent[0]);

    //canvas
    let canvas = document.getElementById(`my-canvas`);
    canvas.width = window.innerWidth - 10;
    canvas.heigth = 400;

    let context = canvas.getContext(`2d`);

    let numCircles = 20;
    let circles = [];

    for(let i = 0; i < numCircles; i++){
        let radius = (Math.random() * 50) + 15;
        let x = Math.random() * canvas.width;
        if(x - radius < 100 || x + radius > canvas.width - 100){
            let x = Math.random() * canvas.width;
        }
        let y = Math.random() * canvas.height;
        if(y - radius < 100 || y + radius > canvas.height - 100){
            let y = Math.random() * canvas.height;
        }
        
        circles.push(new Circle(x, y, radius, context));
    }


    requestAnimationFrame(animate);
    function animate(){
        context.clearRect(0,0,canvas.width,canvas.height);

        for(let i = 0; i < numCircles; i++){
            circles[i].update();
            circles[i].checkBounds(canvas, canvas.width, canvas.height);
            circles[i].display();
        }


        requestAnimationFrame(animate);
    }

}