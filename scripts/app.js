// load saved records first
const savedRecords = loadRecords();

if (savedRecords) {
    records = savedRecords;
}


// page navigation
const navLinks = document.querySelectorAll(".sidebar-nav a");
const dashboard = document.querySelector("#dashboard");
const screens = document.querySelectorAll(".page-screen");
const title = document.querySelector(".topbar h1");

function showPage(pageId, link) {
    dashboard.style.display = pageId === "dashboard" ? "block" : "none";

    screens.forEach((screen) => {
        screen.classList.remove("active-screen");
    });

    navLinks.forEach((navLink) => {
        navLink.classList.remove("active");
    });

    if (pageId !== "dashboard") {
        document.querySelector(`#${pageId}`).classList.add("active-screen");
    }

    if (link) {
        link.classList.add("active");
        title.textContent = link.textContent.trim();
    }
}

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const pageId = link.getAttribute("href").replace("#", "");
        showPage(pageId, link);
    });
});


// open the add record page
const addExpenseButtons = document.querySelectorAll(".add-expense-btn");

addExpenseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const addRecordLink = document.querySelector(
            '.sidebar-nav a[href="#add-record"]'
        );

        showPage("add-record", addRecordLink);
    });
});


// form inputs
const expenseForm = document.querySelector("#expense-form");

const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");

let editingRecordId = null;


// show form errors
function showError(input, message) {
    const error = document.querySelector(`#${input.id}-error`);

    error.textContent = message;

    if (message) {
        input.classList.add("input-error");
    } else {
        input.classList.remove("input-error");
    }
}


// add or edit a record
expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const descriptionError = validateDescription(descriptionInput.value);
    const amountError = validateAmount(amountInput.value);
    const categoryError = validateCategory(categoryInput.value);
    const dateError = validateDate(dateInput.value);

    showError(descriptionInput, descriptionError);
    showError(amountInput, amountError);
    showError(categoryInput, categoryError);
    showError(dateInput, dateError);

    const hasError =
        descriptionError ||
        amountError ||
        categoryError ||
        dateError;

    if (hasError) {
        return;
    }

    if (editingRecordId !== null) {
        const recordToEdit = records.find((record) => {
            return String(record.id) === String(editingRecordId);
        });

        if (!recordToEdit) {
            return;
        }

        recordToEdit.description = descriptionInput.value.trim();
        recordToEdit.amount = Number(amountInput.value);
        recordToEdit.category = categoryInput.value;
        recordToEdit.date = dateInput.value;

        editingRecordId = null;
    } else {
        const newRecord = {
            id: `rec_${Date.now()}`,
            description: descriptionInput.value.trim(),
            amount: Number(amountInput.value),
            category: categoryInput.value,
            date: dateInput.value
        };

        records.push(newRecord);
    }

    saveRecords(records);
    renderRecords(records);
    updateDashboard();

    expenseForm.reset();

    const formStatus = document.querySelector("#form-status");
    formStatus.textContent = "Expense saved.";
});


// records controls
const searchInput = document.querySelector("#record-search");
const categoryFilter = document.querySelector("#category-filter");
const sortSelect = document.querySelector("#record-sort");

function updateRecords() {
    let filtered = searchRecords(records, searchInput.value);

    if (categoryFilter.value) {
        filtered = filtered.filter((record) => {
            return record.category === categoryFilter.value;
        });
    }

    filtered = sortRecords(filtered, sortSelect.value);

    renderRecords(filtered);
}

searchInput.addEventListener("input", updateRecords);
categoryFilter.addEventListener("change", updateRecords);
sortSelect.addEventListener("change", updateRecords);


// records table
const recordsBody = document.querySelector("#records-body");


// edit a record
recordsBody.addEventListener("click", (event) => {
    if (!event.target.classList.contains("edit-btn")) {
        return;
    }

    const recordId = event.target.dataset.id;

    const recordToEdit = records.find((record) => {
        return String(record.id) === String(recordId);
    });

    if (!recordToEdit) {
        return;
    }

    descriptionInput.value = recordToEdit.description;
    amountInput.value = recordToEdit.amount;
    categoryInput.value = recordToEdit.category;
    dateInput.value = recordToEdit.date;

    editingRecordId = recordToEdit.id;

    const addRecordLink = document.querySelector(
        '.sidebar-nav a[href="#add-record"]'
    );

    showPage("add-record", addRecordLink);
});


// delete a record
recordsBody.addEventListener("click", (event) => {
    if (!event.target.classList.contains("delete-btn")) {
        return;
    }

    const recordId = event.target.dataset.id;

    records = records.filter((record) => {
        return String(record.id) !== String(recordId);
    });

    saveRecords(records);
    renderRecords(records);
    updateDashboard();
});


// dashboard numbers
function updateDashboard() {
    const budgetFill = document.querySelector("#budget-fill");
    const totalRecords = document.querySelector("#total-records");
    const totalSpent = document.querySelector("#total-spent");
    const topCategory = document.querySelector("#top-category");
    const budgetSpent = document.querySelector("#budget-spent");
    const budgetStatus = document.querySelector("#budget-status");

    const total = records.reduce((sum, record) => {
        return sum + Number(record.amount);
    }, 0);

    totalRecords.textContent = records.length;
    totalSpent.textContent = `TZS ${total.toLocaleString()}`;
    budgetSpent.textContent = `TZS ${total.toLocaleString()}`;

    const categoryTotals = {};

    records.forEach((record) => {
        if (!categoryTotals[record.category]) {
            categoryTotals[record.category] = 0;
        }

        categoryTotals[record.category] += Number(record.amount);
    });

    let highestCategory = "";
    let highestAmount = 0;

    for (const category in categoryTotals) {
        if (categoryTotals[category] > highestAmount) {
            highestAmount = categoryTotals[category];
            highestCategory = category;
        }
    }

    topCategory.textContent = highestCategory || "None";

    const monthlyBudget = 300000;
    const remaining = monthlyBudget - total;

    let percent = (total / monthlyBudget) * 100;

    if (percent > 100) {
        percent = 100;
    }

    if (percent < 0) {
        percent = 0;
    }

    budgetFill.style.width = `${percent}%`;

    if (remaining >= 0) {
        budgetStatus.textContent =
            `TZS ${remaining.toLocaleString()} remaining`;
    } else {
        budgetStatus.textContent =
            `TZS ${Math.abs(remaining).toLocaleString()} over budget`;
    }
}


// import records from JSON
const importButton = document.querySelector("#import-data");
const importFile = document.querySelector("#import-file");

importButton.addEventListener("click", () => {
    importFile.click();
});

importFile.addEventListener("change", () => {
    const selectedFile = importFile.files[0];

    if (!selectedFile) {
        return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", () => {
        try {
            const importedRecords = JSON.parse(reader.result);

            if (!Array.isArray(importedRecords)) {
                alert("The selected file is not a valid records file.");
                return;
            }

            records = importedRecords;

            saveRecords(records);
            renderRecords(records);
            updateDashboard();

            alert("Records imported successfully.");
        } catch {
            alert("Could not read this JSON file.");
        }

        importFile.value = "";
    });

    reader.readAsText(selectedFile);
});


// clear all saved records
const clearButton = document.querySelector("#clear-data");

clearButton.addEventListener("click", () => {
    const confirmed = confirm(
        "Are you sure you want to clear all records?"
    );

    if (!confirmed) {
        return;
    }

    records = [];

    saveRecords(records);
    renderRecords(records);
    updateDashboard();

    alert("All records cleared.");
});


// export records as JSON
const exportButton = document.querySelector("#export-data");

exportButton.addEventListener("click", () => {
    const jsonData = JSON.stringify(records, null, 2);

    const file = new Blob([jsonData], {
        type: "application/json"
    });

    const fileUrl = URL.createObjectURL(file);

    const downloadLink = document.createElement("a");

    downloadLink.href = fileUrl;
    downloadLink.download = "tende-records.json";

    downloadLink.click();

    URL.revokeObjectURL(fileUrl);
});


// first page load
renderRecords(records);
updateDashboard();