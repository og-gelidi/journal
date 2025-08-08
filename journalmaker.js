class Project {
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

class Entry {
    constructor(overview, challenges, newConcepts, thoughts, time, name) {
        this.overview = overview;
        this.challenges = challenges;
        this.newConcepts = newConcepts;
        this.thoughts = thoughts;
        this.time = time;
        this.name = name;
    }
}


document.getElementById("inputFile").addEventListener("change", readJournal); 
    
function readJournal(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            console.log("Reading journal");
            const journal = parseXML(reader.result);
            displayJournal(journal);
        }
        reader.readAsText(file);
    }


function parseXML(XMLString) {
    const parser = new DOMParser();
    const XMLDoc = parser.parseFromString(XMLString, "application/xml");

        const project = new Project(XMLDoc.documentElement.getAttribute("name"));
        const DOMEntries = Array.from(XMLDoc.getElementsByTagName("entry"));

        DOMEntries.forEach((DOMEntry) => {
            let overview = DOMEntry.getElementsByTagName("overview")[0]?.textContent.trim() || "";
            let challenges = DOMEntry.getElementsByTagName("challenges")[0]?.textContent.trim() || "";
            let newConcepts = DOMEntry.getElementsByTagName("newConcepts")[0]?.textContent.trim() || "";
            let thoughts = DOMEntry.getElementsByTagName("thoughts")[0]?.textContent.trim() || "";
            let time = DOMEntry.getAttribute("time") || "";
            let name = DOMEntry.getAttribute("name") || "";

            const entry = new Entry(overview,challenges,newConcepts,thoughts,time,name);
            project.addEntry(entry);            
        })

    console.log("XML finished parsing.")
    return project;
}

function displayJournal(journal) {
    const journalDiv = document.getElementById("journal");
    //start constructing the html string
    let journalString = "<h1>" + journal.name + "</h1>\n";
    journal.entries.forEach((entry) => {
        journalString = catEntry(journalString, entry);
    })

    journalDiv.innerHTML = journalString;
}

function catEntry(journalString, entry) {
    let entryString = entry.name + " -- " + entry.time + "\n";
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