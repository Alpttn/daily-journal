

import API from "./data.js"
import renderJournalEntries from "./entriesDOM.js"
import makeJournalEntryComponent from "./entryComponent.js"



// Fetch and render journal entries
API.dailyJournalFetch().then(entries => {
    renderJournalEntries(entries)
})


// reference to form input elements
const date = document.querySelector("#journalDate")
const concept = document.querySelector("#concepts")
const entry = document.querySelector("#journalEntry")
const mood = document.querySelector("#mood")
const hiddenEntryIdInput = document.querySelector("#entryId")
// resets the form fields
const resetFormFields = () => {
    date.value = ""
    concept.value = ""
    entry.value = ""
    mood.value = ""
    hiddenEntryIdInput.value = ""
}
// function to make journal entry object from user inputs
const createJournalEntry = (dateInput, conceptInput, entryInput, moodInput) => {
    return {
        dateOfEntry: dateInput.value,
        titleOfEntry: conceptInput.value,
        entryText: entryInput.value,
        currentMood: moodInput.value
    }
}



// add event listener to the submit button
const submitEntryButton = document.querySelector("#submit")
// event listener
submitEntryButton.addEventListener("click", () => {
    const journalEntry = createJournalEntry(date, concept, entry, mood)
    // console.log(journalEntry)
    // add logic here to test if the user is editing
    if (hiddenEntryIdInput.value !== "") {
        editJournalEntry(journalEntry, hiddenEntryIdInput.value) //need to write this function
    } else {
        // Save functionality goes here
        saveJournalEntryAndReRender(journalEntry)
    }
})

// validate the form input fields by blank spaces and curse words
const validateJournalEntry = (journalEntry) => {
    let isValid = true
    if (journalEntry.dateOfEntry === ""
        || journalEntry.titleOfEntry === ""
        || journalEntry.entryText === ""
        || journalEntry.currentMood === "") {
        alert("Please fill in all fields!")
        isValid = false
    }

    // we used test to search the characters we didn't allow and fed through my journal entry text
    // you need the brackets before the characters
    const notAllowedChars = /[\#\$\%\^\&\*\+\=\@\~\<\>\-\_]/;
    const regEx = notAllowedChars.test(journalEntry.entryText)
    console.log('regEx: ', regEx);

    if (regEx === true) {
        alert("You have typed an invalid character")
    }
    // how to validate for curse words
    const curseWords = /^((?!fuck).)*$/gm
    const regExCurseWords = curseWords.test(journalEntry.entryText)
    console.log('regExCurseWords: ', regExCurseWords);

    if (regExCurseWords === false) {
        alert("tisk tisk, no foul language. Please be kind, be a light, respect mother nature, namaste")
    }
    return isValid
}


// how to save the journal entry
const saveJournalEntryAndReRender = journalEntry => {
    const isJournalEntryValid = validateJournalEntry(journalEntry)
    if (isJournalEntryValid) {
        console.log("Saving Journal Entry!", journalEntry)
        API.saveJournalEntry(journalEntry)
            .then(API.dailyJournalFetch)
            .then(renderJournalEntries)

        resetFormFields()
    }
}
// edit journal entry
const editJournalEntry = (journalEntry, entryId) => {
    const isJournalEntryValid = validateJournalEntry(journalEntry)
    if (isJournalEntryValid) {
        API.editJournalEntry(journalEntry, entryId)
            .then(API.dailyJournalFetch)
            .then(renderJournalEntries)

        resetFormFields()
    }
}

// making an event listener for the radio button container to target each button
// then clear out the container and render the filtered data to the DOM
const moodContainer = document.querySelector("#moodContainer")
const entryLog = document.querySelector(".entryLog")

moodContainer.addEventListener("click", e => {
    if (e.target.className.includes("radioMood")) {

        const mood = e.target.value
        entryLog.innerHTML = ""
        console.log("hi")
        API.filterEntryMood(mood).then(filteredData => {
            console.log('filteredData: ', filteredData);

            filteredData.forEach(moodObj => {
                console.log('moodObj: ', moodObj);
                const htmlRepObj = makeJournalEntryComponent(
                    moodObj
                );
                entryLog.innerHTML += htmlRepObj
            });
        })
    }
})


// make eventlistener for delete button
const registerDeleteListener = () => {
    entryLog.addEventListener("click", event => {
        if (event.target.id.startsWith("deleteEntry--")) {
            // Extract entry id from the button's id attribute
            const entryId = event.target.id.split("--")[1]

            // Invoke the delete method, then get all recipes and render them
            API.deleteJournalEntry(entryId)
                .then(API.dailyJournalFetch)
                .then(renderJournalEntries)
        }
    })
}
registerDeleteListener()

// event listener to edit 
entryLog.addEventListener("click", event => {
    if (event.target.id.startsWith("editEntry--")) {
        const entryIdToEdit = event.target.id.split("--")[1]

        /*
            This function will get the recipe from the API
            and populate the form fields (see below)
        */
        updateFormFields(entryIdToEdit)
    }
})

// code to update the form fields
const updateFormFields = entryId => {
    // got reference to input fields previously and will use them below added hidden
    fetch(`http://localhost:3000/entries/${entryId}`)
        .then(response => response.json())
        .then(journalEntry => {
            console.log('entry: ', entry);
            /*
                Now that you KNOW you have the data, render
                an editing form that represents the current
                state of the resource.
            */
            hiddenEntryIdInput.value = journalEntry.id
            date.value = journalEntry.dateOfEntry
            concept.value = journalEntry.titleOfEntry
            entry.value = journalEntry.entryText
            mood.value = journalEntry.currentMood
        })
}