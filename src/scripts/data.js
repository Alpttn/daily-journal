const API = {
    dailyJournalFetch() {
        return fetch("http://localhost:3000/entries")
            .then(response => response.json())
    },

    // Use `fetch` with the POST method to add your entry to your API
    saveJournalEntry(newJournalEntry) {
    //    const entryBody = JSON.stringify(newJournalEntry)
    //    console.log(entryBody)
         fetch("http://localhost:3000/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJournalEntry)
        })
        // .then(response => response.json()) //the object that was just created
    }
}
