const dailyJournalFetch = () => {
    fetch("http://localhost:3000/entries")
        .then(response => response.json())
        .then(entries => {
            renderJournalEntries(entries)
        })
}