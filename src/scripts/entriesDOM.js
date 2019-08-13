import makeJournalEntryComponent from "./entryComponent.js"

const renderJournalEntries = (entries) => {
    // clear current entry log before re rendering the fresh data
    const whereToPlaceIt = document.querySelector(".entryLog")
    whereToPlaceIt.innerHTML = ""
    // for each entry log in the data make a component and append to the entry log
    entries.forEach(journalEntry => {
       const journalEntryComponent = makeJournalEntryComponent(journalEntry);
       whereToPlaceIt.innerHTML += journalEntryComponent
   });
}

export default renderJournalEntries