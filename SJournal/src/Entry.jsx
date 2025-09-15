/*Entry Component
Should return the HTML for rendering an entry, given an entry object*/

function isSameDay(date1,date2) {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

function Entry({ entry, previousEntry }) {

    let displayTime;
    const utc = entry.time.toUTCString();

    if (previousEntry && isSameDay(entry.time, previousEntry.time)) {
        displayTime = utc.slice(17,22);
    } else {
        displayTime = utc.slice(5,16) + " " + utc.slice(17,22);
    }

    return (
        <div className='entryDiv'>

            <h2 className='entryHeader'>
                {entry.name && <span className="title">{entry.name} -- </span>}{displayTime}
            </h2>

            <div className='entryBody'>
                {entry.overview && (
                    <div className="overview">
                        <h3>Overview:</h3>
                        <p>{entry.overview}</p>
                    </div>
                )}
                {entry.challenges && (
                    <div className="challenges">
                        <h3>Challenges:</h3>
                        <p>{entry.challenges}</p>
                    </div>
                )}
                {entry.newConcepts && (
                    <div className="newConcepts">
                        <h3>New Concepts:</h3>
                        <p>{entry.newConcepts}</p>
                    </div>
                )}
                {entry.thoughts && (
                    <div className="thoughts">
                        <h3>Thoughts:</h3>
                        <p>{entry.thoughts}</p>
                    </div>
                )}
            </div>
            <button>Edit Entry</button>
        </div>
    )
}



export default Entry;