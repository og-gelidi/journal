class project {
    constructor(name) {
        this.name = name;
        this.entries = [];
    }
    addEntry(entry) {
        this.entries.push(entry);
    }
    removeEntry(entry) {
        const index = this.entries.indexOf(entry);
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


document.getElementById("inputFile").addEventListener("change", readJournal); 
    
function readJournal(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const journal = parseXML(reader.result);
            displayJournal(journal);
        }
        reader.readAsText(file);
    }


function parseXML(XMLString) {
    const journal = [];
    const parser = new DOMParser();
    const XMLDoc = parser.parseFromString(XMLString, "application/xml");
    const DOMProjects = Array.from(XMLDoc.getElementsByTagName("project"));

    DOMProjects.forEach((DOMProject) => {
        const project = new project(DOMProject.getAttribute("name"));
        const DOMEntries = Array.from(DOMProject.getElementsByTagName("entry"));
        
        DOMEntries.forEach((DOMEntry) => {
            let overview = getChildTextByTag(DOMEntry, "overview");
            let challenges = getChildTextByTag(DOMEntry, "challenges");
            let newConcepts = getChildTextByTag(DOMEntry, "newConcepts");
            let thoughts = getChildTextByTag(DOMEntry, "thoughts");
            let time = DOMEntry.getAttribute("time") || "";

            const entry = new entry(overview,challenges,newConcepts,thoughts,time);
            project.addEntry(entry);            
        })
        journal.push(project);
    });

    return journal;
}

function displayJournal(journal) {
    const journalDiv = document.getElementById("journal");
    //start constructing the html string
    let journalString = "<h1>" + journal.name + "</h1>\n";
    journal.entries.forEach((entry) => {
        journalString = catEntry(journalString, entry);
    })
    
    
}

function catEntry(journalString, entry) {
    let entryString = entry.name + " -- Time: " + entry.time + "\n";
    entryString = "<h2>" + entryString +  "</h2>\n";

    if (entry.overview) {
        entryString += "<h3>Overview:</h3>\n";
        entryString += "<p>" + entry.overview + "</p>\n";
    }
    if (entry.challenges) {
        entryString += "<h3>Challenges:</h3>\n";
        entryString += "<p>" + entry.challenges + "</p>\n";
    }
    if (entry.newConcepts) {
        entryString += "<h3>Challenges:</h3>\n";
        entryString += "<p>" + entry.newConcepts + "</p>\n";
    }
    if (entry.thoughts) {
        entryString += "<h3>Challenges:</h3>\n";
        entryString += "<p>" + entry.thoughts + "</p>\n";
    }



    return journalString + entryString;
}