function renderRecords(items) {
    const body = document.querySelector("#records-body");

    body.innerHTML = "";

    items.forEach((record) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.description}</td>
            <td>${record.category}</td>
            <td>TZS ${record.amount.toLocaleString()}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${record.id}">Edit</button>
                <button class="action-btn delete-btn" data-id="${record.id}">Delete</button>
            </td>
        `;

        body.appendChild(row);
    });
}