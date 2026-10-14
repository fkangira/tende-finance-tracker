// search and sort helpers

function searchRecords(records, query) {
    if (!query.trim()) {
        return records;
    }

    try {
        const pattern = new RegExp(query, "i");

        return records.filter((record) => {
            return (
                pattern.test(record.description) ||
                pattern.test(record.category) ||
                pattern.test(record.date)
            );
        });
    } catch {
        return [];
    }
}

function sortRecords(records, sortBy) {
    const copy = [...records];

    if (sortBy === "oldest") {
        return copy.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (sortBy === "amount-high") {
        return copy.sort((a, b) => b.amount - a.amount);
    }

    if (sortBy === "amount-low") {
        return copy.sort((a, b) => a.amount - b.amount);
    }

    return copy.sort((a, b) => new Date(b.date) - new Date(a.date));
}
