/*
    Define the keys and value for a JavaScript object that
    represents a journal entry about what you learned today
*/
const journalEntry1 = {
    dateOfEntry: new Date("July 14, 2019 11:13:00"),
    titleOfEntry: "JavaScript",
    entryText: "This is a test entry",
    currentMood: "clover",
}

// created the variable to store the array of journal entries// 
const journalEntryLog = []

// used push method to add first journal entry to the array//
journalEntryLog.push(journalEntry1);
console.log(journalEntryLog)

// created two more entries//
const journalEntry2 = {
    dateOfEntry: new Date("July 13, 2019 11:13:00"),
    titleOfEntry: "html",
    entryText: "Today I studied basic html structure",
    currentMood: "peachy",
}
const journalEntry3 = {
    dateOfEntry: new Date("July 12, 2019 11:13:00"),
    titleOfEntry: "CSS",
    entryText: "Today I looked up some sample color templates",
    currentMood: "coffee",
}
// used the push method to add the 2nd and 3rd entries into the array
// then console.log so I could see it displayed in the console.
journalEntryLog.push(journalEntry2, journalEntry3)
console.log(journalEntryLog)


// make a function that returns a journal entry component in html string
const makeJournalEntryComponent = (journalEntry) => {
    return `<section>
    <h3>${journalEntry.titleOfEntry}</h3>
    <p>${journalEntry.entryText}</p>
    <p>${journalEntry.currentMood}</p>
    <p>${journalEntry.dateOfEntry}</p>
    </section>
    `
}

const renderJournalEntries = (journalEntryLog) => {

    journalEntryLog.forEach(journalEntry => {
        const journalEntryComponent = makeJournalEntryComponent(journalEntry);
        const whereToPlaceIt = document.querySelector(".entryLog")
        whereToPlaceIt.innerHTML += journalEntryComponent
    });
}

renderJournalEntries(journalEntryLog);