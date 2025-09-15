class Project {
    constructor(name) {
        this.name = name;
        this.entries = [];
    }
}

export class Entry {
    constructor(overview, challenges, newConcepts, thoughts, time, name) {
        this.overview = overview;
        this.challenges = challenges;
        this.newConcepts = newConcepts;
        this.thoughts = thoughts;
        this.time = new Date(time);
        this.name = name;
    }
}

export function parseXML(XMLString) {
    const parser = new DOMParser();
    const XMLDoc = parser.parseFromString(XMLString, "application/xml");

        const parsedProject = new Project(XMLDoc.documentElement.getAttribute("name"));
        const DOMEntries = Array.from(XMLDoc.getElementsByTagName("entry"));
        DOMEntries.forEach((DOMEntry) => {
            let overview = DOMEntry.getElementsByTagName("overview")[0]?.textContent.trim() || "";
            let challenges = DOMEntry.getElementsByTagName("challenges")[0]?.textContent.trim() || "";
            let newConcepts = DOMEntry.getElementsByTagName("newConcepts")[0]?.textContent.trim() || "";
            let thoughts = DOMEntry.getElementsByTagName("thoughts")[0]?.textContent.trim() || "";
            let time = DOMEntry.getAttribute("time") || "";
            let name = DOMEntry.getAttribute("name") || "";

            parsedProject.entries.push(
                new Entry(overview,challenges,newConcepts,thoughts,time,name)
            );
            })

    console.log("XML finished parsing.")
    return parsedProject;
}