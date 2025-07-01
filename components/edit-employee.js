import {LitElement, css, html} from 'lit';
import {Router} from '@vaadin/router';
import {ContextConsumer} from '@lit/context';
import {employeeContext} from '../context/EmployeeContext';

export class EditEmployee extends LitElement {
  static properties = {
    _firstName: {state: true},
    _lastName: {state: true},
    _dateOfEmployment: {state: true},
    _dateOfBirth: {state: true},
    _phone: {state: true},
    _email: {state: true},
    _department: {state: true},
    _position: {state: true},
  };

  static styles = css`
    * {
      box-sizing: border-box;
    }

    .component {
      background-color: #00000007;
      padding: 16px 20px;
      min-height: 100dvh;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ff6200;
    }

    .edit-employee {
      background-color: white;
      padding: 48px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      place-items: center;
      gap: 48px;
    }

    .input-div {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .input {
      width: 250px;
      padding: 6px 10px;
    }

    .label {
      font-size: 12px;
    }

    .select-el {
      width: 250px;
      padding: 6px 10px;
    }

    .action-buttons {
      place-self: center;
      grid-column: 1/-1;
      display: flex;
      justify-content: center;
      gap: 48px;
      flex-wrap: wrap;
    }

    .action-button {
      padding: 6px;
      border-radius: 6px;
      cursor: pointer;
      width: 200px;
    }

    .action-button-cancel {
      background-color: white;
      border: 1px solid #525199;
      color: #525199;
    }

    .action-button-save {
      background-color: #ff6200;
      border: none;
      color: white;
    }
  `;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    const params = new URLSearchParams(window.location.search);
    const editingEmployeeId = params.get('id');

    this._consumer = new ContextConsumer(this, employeeContext, (value) => {
      const employee = value.find((el) => el.id === editingEmployeeId);
      this._employee = employee;
      this._firstName = employee.firstName;
      this._lastName = employee.lastName;
      this._dateOfEmployment = employee.dateOfEmployment;
      this._dateOfBirth = employee.dateOfBirth;
      this._phone = employee.phone;
      this._email = employee.email;
      this._department = employee.department;
      this._position = employee.position;
      this.requestUpdate();
    });
  }

  handleEditEmployee(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.submitter.form));
    formData.id = this._employee.id;
    const contextEl = document.querySelector('employee-context');
    contextEl.editEmployee(this._employee.id, formData);
    Router.go('/');
  }

  render() {
    return html`
      <div class="component">
        <div class="header">
          <h3>Edit Employee</h3>
        </div>
        <form @submit=${this.handleEditEmployee} class="edit-employee">
          <div class="input-div">
            <label for="first-name" class="label">First Name</label>
            <input
              @input=${(e) => {
                const value = e.target.value.replace(
                  /[^A-Za-zğüşöçıİĞÜŞÖÇ\s]/g,
                  ''
                );
                this._firstName = value;
                e.target.value = this._firstName;
              }}
              id="first-name"
              name="firstName"
              class="input"
              type="text"
              value="${this._firstName}"
              required
            />
          </div>
          <div class="input-div">
            <label for="last-name" class="label">Last Name</label>
            <input
              @input=${(e) => {
                const value = e.target.value.replace(
                  /[^A-Za-zğüşöçıİĞÜŞÖÇ\s]/g,
                  ''
                );
                this._lastName = value;
                e.target.value = this._lastName;
              }}
              id="last-name"
              name="lastName"
              class="input"
              type="text"
              .value="${this._lastName}"
              required
            />
          </div>
          <div class="input-div">
            <label for="date-of-employment" class="label">
              Date of Employment
            </label>
            <input
              @input=${(e) => (this._dateOfEmployment = e.target.value)}
              id="date-of-employment"
              name="dateOfEmployment"
              class="input"
              type="text"
              value="${this._dateOfEmployment}"
              required
            />
          </div>
          <div class="input-div">
            <label for="date-of-birth" class="label">Date of Birth</label>
            <input
              @input=${(e) => (this._dateOfBirth = e.target.value)}
              id="date-of-birth"
              name="dateOfBirth"
              class="input"
              type="text"
              value="${this._dateOfBirth}"
              required
            />
          </div>
          <div class="input-div">
            <label for="phone" class="label">Phone</label>
            <input
              @input=${(e) => {
                const value = e.target.value.replace(/[^\d()+\s-]/g, '');
                this._phone = value;
                e.target.value = this._phone;
              }}
              id="phone"
              name="phone"
              class="input"
              type="text"
              value="${this._phone}"
              required
            />
          </div>
          <div class="input-div">
            <label for="email" class="label">Email</label>
            <input
              @input=${(e) => (this._email = e.target.value)}
              id="email"
              name="email"
              class="input"
              type="email"
              value="${this._email}"
              required
            />
          </div>
          <div class="input-div">
            <label for="department" class="label">Department</label>
            <select
              @input=${(e) => (this._department = e.target.value)}
              id="department"
              name="department"
              class="input"
              required
            >
              <option
                ?selected=${this._department === 'Analytics'}
                value="Analytics"
              >
                Analytics
              </option>
              <option ?selected=${this._department === 'Tech'} value="Tech">
                Tech
              </option>
            </select>
          </div>
          <div class="input-div">
            <label for="position" class="label">Position</label>
            <select
              @input=${(e) => (this._position = e.target.value)}
              name="position"
              id="position"
              required
              class="select-el"
            >
              <option ?selected=${this._position === 'Junior'} value="Junior">
                Junior
              </option>
              <option ?selected=${this._position === 'Medior'} value="Medior">
                Medior
              </option>
              <option ?selected=${this._position === 'Senior'} value="Senior">
                Senior
              </option>
            </select>
          </div>
          <div class="action-buttons">
            <button type="submit" class="action-button action-button-save">
              Save
            </button>
            <button
              @click=${() => Router.go('/')}
              class="action-button action-button-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

window.customElements.define('edit-employee', EditEmployee);
