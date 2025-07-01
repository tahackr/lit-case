import {ContextProvider, createContext} from '@lit/context';
import {LitElement, html} from 'lit';
import {v4 as uuidv4} from 'uuid';

export const employeeContext = createContext('employee-context');

export class EmployeeContext extends LitElement {
  constructor() {
    super();
    this._employees =
      JSON.parse(localStorage.getItem('employees')) ||
      new Array(100).fill(null).map(() => ({
        id: uuidv4(),
        firstName: 'Ahmet',
        lastName: 'Sourtimes',
        dateOfEmployment: '23/09/2022',
        dateOfBirth: '23/09/2022',
        phone: `+(90) 532 ${(Math.random() * 100000).toFixed(0)}`,
        email: 'ahmet@sourtimes.org',
        department: 'Analytics',
        position: 'Junior',
      }));

    this._provider = new ContextProvider(this, {
      context: employeeContext,
      initialValue: this._employees,
    });
  }

  updateEmployees(newEmployees) {
    this._employees = newEmployees;
    this._provider.setValue(this._employees);
    localStorage.setItem('employees', this._employees);
  }

  addEmployee(newEmployee) {
    this._employees = [newEmployee, ...this._employees];
    this._provider.setValue(this._employees);
    localStorage.setItem('employees', this._employees);
  }

  editEmployee(editedEmployeeId, newEmployeeData) {
    this._employees = this._employees.map((employee) =>
      employee.id === editedEmployeeId ? newEmployeeData : employee
    );
    this._provider.setValue(this._employees);
    localStorage.setItem('employees', this._employees);
  }

  render() {
    return html`<slot></slot>`;
  }
}

window.customElements.define('employee-context', EmployeeContext);
