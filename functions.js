class project {
    constructor(name) {
        this.name = name;
        this.entries = [];
    }
    addEntry(entry) {
        this.entries.push(entry);
    }
    removeEntry(entry) {
        let index = this.entries.indexOf(entry);
        this.entries.splice(index, 1);
    }
}

class entry {
    constructor(overview, challenges, newConcepts, thoughts, time) {
        this.overview = overview;
        this.challenges = challenges;
        this.newConcepts = newConcepts;
        this.thoughts = thoughts;
        this.time = time;
    }
}

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

function parseXML(XMLString) {
    let journal = [];
    const parser = new DOMParser();
    const XMLDoc = parser.parseFromString(XMLString, "application/xml");
    let DOMProjects = Array.from(XMLDoc.getElementsByTagName("project"));

    DOMProjects.forEach((DOMProject) => {
        let project = new project(DOMProject.getAttribute("name"));
        let DOMEntries = Array.from(DOMProject.getElementsByTagName("entry"));
        
        DOMEntries.forEach((DOMEntry) => {
            let overview = getChildTextByTag(DOMEntry, "overview");
            let challenges = getChildTextByTag(DOMEntry, "challenges");
            let newConcepts = getChildTextByTag(DOMEntry, "newConcepts");
            let thoughts = getChildTextByTag(DOMEntry, "thoughts");
            let time = DOMEntry.getAttribute("time") || "";

            let entry = new entry(overview,challenges,newConcepts,thoughts,time);
            project.addEntry(entry);            
        })
        journal.push(project);
    });

    return journal;
}