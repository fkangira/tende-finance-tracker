// save records in the browser

function saveRecords(records) {
    localStorage.setItem("tendeRecords", JSON.stringify(records));
}

// get saved records 

function loadRecords() {
    const savedRecords = localStorage.getItem("tendeRecords");

    if (savedRecords) {
        return JSON.parse(savedRecords);
    }

    return null;
}