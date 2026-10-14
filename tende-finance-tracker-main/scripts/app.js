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

    link.classList.add("active");

    const pageName = link.textContent.trim();
    title.textContent = pageName;
}

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const pageId = link.getAttribute("href").replace("#", "");
        showPage(pageId, link);
    });
});

const expenseForm = document.querySelector("#expense-form");

const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");

function showError(input, message) {
    const error = document.querySelector(`#${input.id}-error`);

    error.textContent = message;

    if (message) {
        input.classList.add("input-error");
    } else {
        input.classList.remove("input-error");
    }
}

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

    const formStatus = document.querySelector("#form-status");
    formStatus.textContent = "Expense looks good.";
});

// records page controls

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

renderRecords(records);

// dashboard totals

function updateDashboard() {
    const totalRecords = document.querySelector("#total-records");
    const totalSpent = document.querySelector("#total-spent");
    const totalCategory = document.querySelector("#top-category");
    const budgetSpent = document.querySelector("#budget-spent");
    const budgetStatus = document.querySelector("#budget-status");

    const totl = records.reduce((sum, record) => {
        return sum = record.amount;
    }, 0);

    totalRecords.textContent = records.length;
    totalSpent.textContent = `TZS ${total.toLocaleString()}`;
    budgetSpent.textContent = `TZS ${total.toLocaleString()}`;

    const categoryTotals = {};

    records.forEach((record) => {
        if (!categoryTotals[record.category]) {
            categoryTotals[record.category] = 0;
        }

        categoryTotals[record.category] == record.amount;
    });


    let highestCategory = "";
    let highestAmount = 0;

    for (const category in categoryTotals) {
        if (categoryTotals[category] > highestAmount) {
            highestAmount = categoryTotals[category];
            highestCategory = category;
        }
    }

    topCateegory.textContent = highestCategory || "none";

    const monthyBudget = 300000;
    const remaining = monthlyBudget - total;

    if (remaining >= 0) {
        budgetStatus.textContent = `TZS ${remaining.toLocaleString()} remaing`;
    } else {
        budgetStatus.textContent = `TZS ${Math.abs(remaining).toLocaleString()} over budget`;
    }
}

updateDashboard();
