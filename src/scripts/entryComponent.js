const makeJournalEntryComponent = (journalEntry) => {
    return `<section>
    <h3>${journalEntry.titleOfEntry}</h3>
    <p>${journalEntry.entryText}</p>
    <p>${journalEntry.currentMood}</p>
    <p>${journalEntry.dateOfEntry}</p>
    </section>
    `
}