# Employee Records App

A simple employee management app built with [Lit](https://lit.dev/) and [Vaadin Router](https://vaadin.com/router). It allows you to list, add, edit, and delete employee records.

## 🛠 Tech Stack

- [Lit](https://lit.dev/)
- [Vaadin Router](https://vaadin.com/router)
- [Rollup](https://rollupjs.org/) for bundling

## 🚀 Features

- View paginated employee list
- Add new employees
- Edit existing records
- Delete employee records with a modal confirmation
- Dummy data generation for testing
- Routing with Vaadin Router
- Store employee list in localStorage
- Context-based global state management

### 🔧 Core Methods

- `addEmployee(employee)`
  Adds a new employee to the context state and updates all consumers.

- `updateEmployees(newEmployeeList)`
  Replaces the current list of employees with a new one.

- `handleDeleteRecord()`
  Filters the employee list to delete the selected employee based on their unique id and calls `updateEmployees()`.

- `editEmployee(editedEmployeeId, newEmployeeData)`
  Replaces the edited employee data with a new one.

### Notes:

- Due to my work commitments, I wasn’t able to complete all the tasks. Below are the pending tasks and the improvements I would have implemented if I had more time:
- Add the localization support to Turkish language.
- Add detailed unit tests for each web component and the functionality. (The reason I couldn’t complete this task is not related to time — I’ve never written a unit test before.)
- There’s quite a bit of repetitive code. I could have created new components to handle those parts and merged the addEmployee and editEmployee components into one.
- The DatePicker components are missing, and some input validations have not been implemented.
