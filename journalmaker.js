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


document.getElementById("inputFile").addEventListener("change", readAndDisplay); 
    
function readAndDisplay(event) {
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
    journalDiv.innerHTML = `<h1>${journal.name}</h1>\n`;
    journal.entries.forEach((entry) => {
        catEntry(journalDiv, entry);
    })
}

function catEntry(journalDiv, entry) {
    let entryHTML;
    if (entry.name) {
        entryHTML = `${entry.name} -- ${entry.time}\n`;
    }
    else {
        entryHTML = entry.time + "\n";
    }
    entryHTML = "<h2>" + entryHTML +  "</h2>\n";

    if (entry.overview) {
        entryHTML += `<h3>Overview:</h3>\n<p>${entry.overview}</p>\n`;
    }
    if (entry.challenges) {
        entryHTML += `<h3>Challenges:</h3>\n<p>${entry.challenges}</p>\n`;
    }
    if (entry.newConcepts) {
        entryHTML += `<h3>newConcepts:</h3>\n<p>${entry.newConcepts}</p>\n`;
    }
    if (entry.thoughts) {
        entryHTML += `<h3>Thoughts:</h3>\n<p>${entry.thoughts}</p>\n`;
    }


    const entryDiv = document.createElement("div");
    entryDiv.class = "entry";
    entryDiv.innerHTML = entryHTML;

    const edit = document.createElement("button");
    edit.textContent = "Edit Entry";
    edit.onclick = console.log("edit button pressed");
    entryDiv.appendChild(edit);

    journalDiv.appendChild(entryDiv);
}