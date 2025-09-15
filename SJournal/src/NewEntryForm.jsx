/* New Entry Form
Boxes for writing the entry in, should update state with new entry obj
*/
import { useState } from 'react';
import { Entry } from './utils/journalParser';

function NewEntryForm({ addEntryFunc }) {
  const [name, setName] = useState('');
  const [overview, setOverview] = useState('');
  const [challenges, setChallenges] = useState('');
  const [newConcepts, setNewConcepts] = useState('');
  const [thoughts, setThoughts] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    const entry = new Entry(
      overview,
      challenges,
      newConcepts,
      thoughts,
      new Date(),
      name,
    );

    addEntryFunc(entry);
    };

  return (
    <form id="entryForm" onSubmit={onSubmit}>
      <label>
        Title (optional):
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br />

      <label>
        Overview:
        <textarea
          name="overview"
          value={overview}
          onChange={(event) => setOverview(event.target.value)}
        ></textarea>
      </label>
      <br />

      <label>
        Challenges:
        <textarea
          name="challenges"
          value={challenges}
          onChange={(event) => setChallenges(event.target.value)}
        ></textarea>
      </label>
      <br />

      <label>
        New concepts learned/used:
        <textarea
          name="newConcepts"
          value={newConcepts}
          onChange={(event) => setNewConcepts(event.target.value)}
        ></textarea>
      </label>
      <br />

      <label>
        Thoughts:
        <textarea
          name="thoughts"
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
        ></textarea>
      </label>
      <br />

      <button type="submit">Save Entry</button>
    </form>
  );
}

export default NewEntryForm;