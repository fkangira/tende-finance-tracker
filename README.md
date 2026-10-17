# Tende - M1 Spec and Wireframes

## App idea

Tende is a simple student finance tracker.

The idea is to help students record the money they spend and also understand where most of their money is going.

I chose this idea because students spend money on different things every day, for example food, transport, books, internet, entertainment and school fees. Sometimes it is hard to remember how much has already been spent, so Tende will help make that easier to see.

## Main pages

The app will have five main parts:

1. Dashboard
2. Records
3. Add Record
4. Settings
5. About

## Dashboard

The dashboard will show a quick summary of the user's spending.

It will show:

- Number of records
- Total amount spent
- Category where the user spends the most
- Spending by category
- Recent records
- Budget information

## Records

The Records page will show all saved expenses.

The user will be able to:

- Search records
- Sort records
- Filter by category
- Edit a record
- Delete a record

On desktop, records will use a table.

On mobile, records will change into cards so they fit better on a smaller screen.

## Add Record

The Add Record page will have a form with:

- Description
- Amount
- Category
- Date

The app will check the values before saving them.

## Settings

The Settings page will allow the user to:

- Change the currency
- Export records as JSON
- Import records from JSON
- Clear saved data

## About

The About page will explain what Tende is and what the app is meant to do.

It will also include my contact information and GitHub link.

## Data model

Each expense will be saved as an object.

Example:

    {
        id: "rec_001",
        description: "Lunch at cafeteria",
        amount: 12500,
        category: "Food",
        date: "2026-09-25",
        createdAt: "2026-09-25T10:30:00",
        updatedAt: "2026-09-25T10:30:00"
    }

## Categories

For the first version of Tende, I will use:

- Food
- Transport
- Books
- Entertainment
- Fees
- Other

## Responsive plan

On desktop:

- Navigation will stay on the left.
- Records will use a table.
- Dashboard cards will sit next to each other.

On mobile:

- Navigation will become smaller.
- Records will become cards.
- Dashboard cards will stack.
- Forms and buttons will use most of the available width.

## Accessibility plan

I will include:

- Labels for form inputs
- Visible keyboard focus
- Good color contrast
- Clear error messages
- Semantic HTML
- ARIA live messages for important updates
- Clear buttons

## Wireframe idea

The UI will follow the Tende design I planned before coding.

The layout will have a dark blue navigation area and a light main content area.

The Dashboard will show spending summaries, chart information, budget information and recent records.

The Records page will focus on searching, filtering, sorting and managing expenses.

The Add Record page will use a simple form.

The Settings page will contain currency and data options.

The About page will contain a short explanation of the project and my information.


## Final Features

Tende now includes:

- Responsive dashboard and navigation
- Add, edit and delete expense records
- Form validation using regular expressions
- Search, filter and sorting
- Dashboard totals and budget tracking
- LocalStorage persistence
- JSON export and import
- Clear data option
- Seed data in `seed.json`
- Browser-based tests in `tests.html`

## Running the Project

From the parent folder, run:

```powershell
python -m http.server 5500 --directory tende-finance-tracker-main