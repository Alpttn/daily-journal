

import API from "./data.js"
import renderJournalEntries from "./entriesDOM.js"
import makeJournalEntryComponent from "./entryComponent.js"




API.dailyJournalFetch().then(entries => {
    renderJournalEntries(entries)
})


// reference to form input elements
const date = document.querySelector("#journalDate")
const concept = document.querySelector("#concepts")
const entry = document.querySelector("#journalEntry")
const mood = document.querySelector("#mood")

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
    saveJournalEntryAndReRender(journalEntry)

    // const dateValue = date.value
    // const conceptValue = concept.value
    // const entryValue = entry.value
    // const moodValue = mood.value
    // const journalEntryObject = createEntryObjFromInput(dateValue, conceptValue, entryValue, moodValue)
    // console.log(journalEntryObject) //still need to send journal entry object to database
    // API.saveJournalEntry(journalEntryObject)
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
        // API.saveJournalEntry(journalEntry)
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
