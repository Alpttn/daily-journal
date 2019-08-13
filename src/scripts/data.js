const API = {
    dailyJournalFetch() {
        return fetch("http://localhost:3000/entries")
            .then(response => response.json())
    },

    // Use `fetch` with the POST method to add your entry to your API
    saveJournalEntry(newJournalEntry) {
        //    const entryBody = JSON.stringify(newJournalEntry)
        //    console.log(entryBody)
        return fetch("http://localhost:3000/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJournalEntry)
        })
            .then(response => response.json()) //the object that was just created
    },

    filterEntryMood(radioValue) { //created function inside of API to query data from fetch then parse then return
        return fetch(
            `http://localhost:3000/entries?currentMood=${radioValue}`
        ).then(entries => entries.json());
    },

    deleteJournalEntry(entryId) {
        //    const entryBody = JSON.stringify(newJournalEntry)
        //    console.log(entryBody)
        return fetch(`http://localhost:3000/entries/${entryId}`, {
            method: "DELETE",
        })
            .then(response => response.json())
    },

    editJournalEntry(journalEntry, entryId) {
        //    const entryBody = JSON.stringify(newJournalEntry)
        //    console.log(entryBody)
        return fetch(`http://localhost:3000/entries/${entryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(journalEntry)
        })
            .then(response => response.json())
    },
}

export default API
