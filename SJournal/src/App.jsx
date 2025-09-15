import { useState } from 'react'
import { parseXML } from './utils/journalParser'
import './App.css'
import Entry from './Entry';
import NewEntryForm from './NewEntryForm';

function App() {
  const [project, setProject] = useState(null);
  const [isAddingEntry, setIsAddingEntry] = useState(false);

  function handleFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            console.log("Parsing XML...");
            const parsedProject = parseXML(reader.result);
            setProject(parsedProject);
        }
        reader.readAsText(file);
    }

    function addNewEntry(entry) {
      const updatedProject = {
        ...project,
        entries: [...project.entries, entry],
      };
      setProject(updatedProject);
      setIsAddingEntry(false);
    }

  
  return (
    <>
      <h1>SJournal</h1>
      <input type="file" id="inputFile" onChange={handleFile} />
      {project && (
        <>
          <h1>Project Title: {project.name}</h1>
          {project.entries.map((entry, index) => (
            <Entry key={entry.time.toUTCString()} entry={entry} previousEntry={project.entries[index-1] || null} />
          ))}
          
          {isAddingEntry ? (
            <NewEntryForm addEntryFunc={addNewEntry}/>
          ) : (
            <button onClick={() => setIsAddingEntry(true)}>
              New Entry
            </button>
          )}
        </>
      )}
    </>
  )
}

export default App