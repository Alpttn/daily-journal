const makeJournalEntryComponent = (journalEntry) => {
    return `<section>
    <h3>${journalEntry.titleOfEntry}</h3>
    <p>${journalEntry.entryText}</p>
    <p>${journalEntry.currentMood}</p>
    <p>${journalEntry.dateOfEntry}</p>
    <button id="deleteEntry--${journalEntry.id}">
        Delete Entry
    </button>
    <button id="editEntry--${journalEntry.id}">
        Edit Entry
    </button>
    </section>
    `
}

export default makeJournalEntryComponent