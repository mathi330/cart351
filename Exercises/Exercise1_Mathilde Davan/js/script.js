window.onload = function(){
    document.getElementById('inputTest').addEventListener('change', customFileHandler);
    document.getElementById('inputText').addEventListener('change', readAndHandleTextFile);

    function readAndHandleTextFile(){
        // get the file list ...
        const selectedFileList = this.files;
        const file = selectedFileList[0];
        if (file.type.startsWith('text/')){
            const pTag = document.createElement("p"); // create a new image element
            const reader = new FileReader();
            //once is read
            reader.addEventListener("load", function () {
                console.log(reader.result);
                pTag.textContent = reader.result;
                // append to the document
                document.getElementById("resText").appendChild(pTag);
            });
            // to read the file as text
            reader.readAsText(file);
        } //if
    }//event handler
}