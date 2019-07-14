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