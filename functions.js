function readJournal() {
    document.getElementById("inputFile").addEventListener("change", function (event) {
        const file = event.target.files[0];
        const fileReader = new FileReader();

        fileReader.onload = function() {
            console.log("file loaded successfully.");
            //parse the file into xml and do stuff
        }
        fileReader.readAsText(file);
    })
}