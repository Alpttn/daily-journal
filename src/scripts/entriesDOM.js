import makeJournalEntryComponent from "./entryComponent.js"

const renderJournalEntries = (entries) => {
    entries.forEach(journalEntry => {
       const journalEntryComponent = makeJournalEntryComponent(journalEntry);
       const whereToPlaceIt = document.querySelector(".entryLog")
       whereToPlaceIt.innerHTML += journalEntryComponent
   });
}

export default renderJournalEntries