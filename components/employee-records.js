import {LitElement, css, html} from 'lit';
import {employeeContext} from '../context/EmployeeContext.js';
import {ContextConsumer} from '@lit/context';
import {Router} from '@vaadin/router';

const recordsPerPage = 9;

export class EmployeeRecords extends LitElement {
  static properties = {
    _employees: {state: true},
    _currentPage: {state: true},
    _maxPage: {state: true},
    _dataPresentationFormat: {state: true},
    _showModal: {state: true},
    _employeeToBeDeleted: {state: true},
    _showDummyData: {state: true},
    _language: {state: true},
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

    .box-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
      place-items: stretch;
      grid-row-gap: 24px;
      grid-column-gap: 48px;
      padding: 0 32px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ff6200;
    }

    .presentation-format-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0px;
      height: 16px;
    }

    .icon-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon-container svg {
      width: 16px;
      height: 16px;
    }

    svg {
      width: 16px;
      height: 16px;
    }

    td button {
      padding: 0;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }

    .presentation-format-button:hover svg {
      fill: #ff6200;
    }

    .presentation-format-button:hover svg path {
      stroke: #ff6200;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 16px 0;
      gap: 6px;
    }

    .page-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0 6px;
      border-radius: 9999px;
      min-width: 24px;
      height: 24px;
      font-size: 12px;
      color: #333;
    }

    .page-button:hover {
      background-color: #ff8235;
      color: white;
    }

    .current-page {
      background-color: #ff6200;
      color: white;
    }

    .page-left-right-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0 6px;
      border-radius: 9999px;
      min-width: 24px;
      height: 24px;
      font-size: 18px;
      color: #ff6200;
    }

    .page-left-right-button:disabled {
      color: #1010104d;
    }

    table {
      width: 100%;
      padding: 8px 16px;
      background-color: white;
      border-collapse: collapse;
      font-size: 14px;
    }

    tr {
      border-bottom: 1px solid #00000026;
    }

    tbody tr:last-child {
      border-bottom: none;
    }
    .table-select-button,
    .table-select-button-main {
      width: 14px;
      height: 14px;
      border: 1px solid #777;
      padding: 0px;
      border-radius: 4px;
      background-color: transparent;
    }

    th {
      color: #ff6200;
      font-weight: 400;
    }

    td:not(:nth-child(2)):not(:nth-child(3)) {
      color: #777;
    }

    th:first-child,
    td:first-child {
      text-align: start;
    }

    td {
      text-align: center;
    }

    td,
    th {
      padding: 20px 16px;
      white-space: nowrap;
    }
  `;

  constructor() {
    super();
    this._employees = [];
    this._consumer = new ContextConsumer(this, employeeContext, (value) => {
      this._employees = value;
      this._currentPage = 1;
      this._maxPage = Math.ceil(this._employees.length / recordsPerPage) || 1;
      this.requestUpdate();
    });
    this._showModal = false;

    this._dataPresentationFormat =
      localStorage.getItem('dataPresentationFormat') || 'table';
    this._showDummyData = !localStorage.getItem('dummyDataCleared');
    this._language = document.documentElement.lang || 'en';
  }

  updated(changedProps) {
    if (changedProps.has('_employees')) {
      localStorage.setItem('employees', JSON.stringify(this._employees));
    }
  }

  get selectButtons() {
    return this.renderRoot?.querySelectorAll('.table-select-button') ?? null;
  }

  // Dummy data cleaning
  handleClearDummyData() {
    localStorage.setItem('dummyDataCleared', true);
    this._showDummyData = false;
    this._employees = [];
    this._maxPage = Math.ceil(this._employees.length / recordsPerPage) || 1;
    this._currentPage = 1;
    // Update context
    this.closest('employee-context').updateEmployees(this._employees);
  }

  handleOpenModal() {
    this._showModal = true;
  }

  changeEmployeeToBeDeleted(employee) {
    this._employeeToBeDeleted = employee;
  }

  handleCloseModal() {
    this._showModal = false;
  }

  handleDeleteRecord() {
    this._employees = this._employees.filter(
      (employee) => employee.id !== this._employeeToBeDeleted.id
    );

    // Update context
    this.closest('employee-context').updateEmployees(this._employees);

    // Update max page in case deleting a record reduces it
    this._maxPage = Math.ceil(this._employees.length / recordsPerPage) || 1;

    // Update current page if user is on the last page and there are no records left to show in that page
    if (this._currentPage > this._maxPage && this._currentPage > 1) {
      this._currentPage -= 1;
    }

    this.handleCloseModal();
  }

  handlePageChange(direction) {
    if (direction === 'back') {
      this._currentPage -= 1;
    } else {
      this._currentPage += 1;
    }
  }

  handleChangeDataPresentationFormat(format) {
    localStorage.setItem('dataPresentationFormat', format);
    this._dataPresentationFormat = format;
  }

  createPagination() {
    const pages = [];

    if (this._maxPage <= 7) {
      for (let i = 1; i <= this._maxPage; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (this._currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '..', this._maxPage);
    } else if (this._currentPage >= this._maxPage - 3) {
      pages.push(1, '..');
      for (let i = this._maxPage - 4; i <= this._maxPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, '..');
      for (let i = this._currentPage - 1; i <= this._currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('..', this._maxPage);
    }

    return pages;
  }

  render() {
    return html`
      <div class="component">
        <div class="header">
          <h3>Employee List</h3>
          ${this._showDummyData
            ? html`<button
                style="cursor: pointer; font-size: 10px;"
                @click=${this.handleClearDummyData}
              >
                <p style="margin: 0px; font-size: 14px;">Clear Dummy Data</p>
                <p style="margin: 0px; color: red;">
                  This action is irreversible!
                </p>
                <p style="margin: 0px; color: red;">
                  Only click this after you've finished testing with large data.
                </p>
              </button>`
            : ''}
          <div class="icon-container">
            <button
              class="presentation-format-button"
              @click=${() => this.handleChangeDataPresentationFormat('table')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="10 5 5 15"
                fill="none"
              >
                <path
                  d="M4 18L20 18"
                  stroke="${this._dataPresentationFormat === 'table'
                    ? '#ff6200'
                    : '#fa9556'}"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M4 12L20 12"
                  stroke="${this._dataPresentationFormat === 'table'
                    ? '#ff6200'
                    : '#fa9556'}"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M4 6L20 6"
                  stroke="${this._dataPresentationFormat === 'table'
                    ? '#ff6200'
                    : '#fa9556'}"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <button
              class="presentation-format-button"
              @click=${() => this.handleChangeDataPresentationFormat('list')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="${this._dataPresentationFormat === 'table'
                  ? '#fa9556'
                  : '#ff6200'}"
                height="800px"
                width="800px"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 458.379 458.379"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <g>
                      <circle cx="53.792" cy="53.311" r="53.311" />
                      <circle cx="404.908" cy="53.311" r="53.311" />
                      <circle cx="229.35" cy="53.311" r="53.311" />
                      <circle cx="53.472" cy="229.19" r="53.312" />
                      <circle cx="404.587" cy="229.19" r="53.312" />
                      <circle cx="229.03" cy="229.19" r="53.312" />
                      <circle cx="53.472" cy="405.068" r="53.311" />
                      <circle cx="404.587" cy="405.068" r="53.311" />
                      <circle cx="229.03" cy="405.068" r="53.311" />
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>

        ${this._dataPresentationFormat === 'table'
          ? html`<div style="overflow: scroll;">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        @input=${(e) => {
                          this.selectButtons.forEach((sb) => {
                            sb.checked = e.target.checked ? true : false;
                          });
                        }}
                        type="checkbox"
                        class="table-select-button-main"
                      />
                    </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Employment</th>
                    <th>Date of Birth</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._employees
                    .slice(
                      (this._currentPage - 1) * recordsPerPage,
                      this._currentPage * recordsPerPage
                    )
                    .map(
                      (employee) => html`
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              class="table-select-button"
                            />
                          </td>
                          <td>${employee.firstName}</td>
                          <td>${employee.lastName}</td>
                          <td>${employee.dateOfEmployment}</td>
                          <td>${employee.dateOfBirth}</td>
                          <td>${employee.phone}</td>
                          <td>${employee.email}</td>
                          <td>${employee.department}</td>
                          <td>${employee.position}</td>
                          <td>
                            <button
                              @click=${() => {
                                Router.go(`/edit-employee?id=${employee.id}`);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                fill="#ff6200"
                                version="1.1"
                                id="Capa_1"
                                width="800px"
                                height="800px"
                                viewBox="0 0 494.936 494.936"
                                xml:space="preserve"
                              >
                                <g>
                                  <g>
                                    <path
                                      d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157    c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21    s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741    c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"
                                    />
                                    <path
                                      d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069    c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963    c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692    C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107    l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005    c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"
                                    />
                                  </g>
                                </g>
                              </svg>
                            </button>
                            <button
                              @click=${() => {
                                this.handleOpenModal();
                                this.changeEmployeeToBeDeleted(employee);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#ff6200"
                                width="800px"
                                height="800px"
                                viewBox="0 0 24 24"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />

                                <g id="SVGRepo_iconCarrier">
                                  <path
                                    d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"
                                  />
                                </g>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      `
                    )}
                </tbody>
              </table>
            </div>`
          : html`<div class="box-grid">
              ${this._employees
                .slice(
                  (this._currentPage - 1) * recordsPerPage,
                  this._currentPage * recordsPerPage
                )
                .map(
                  (employee) =>
                    html`<employee-record-box
                      .employee=${employee}
                      .handleCloseModal=${this.handleCloseModal.bind(this)}
                      .handleOpenModal=${this.handleOpenModal.bind(this)}
                      .changeEmployeeToBeDeleted=${this.changeEmployeeToBeDeleted.bind(
                        this
                      )}
                    ></employee-record-box>`
                )}
            </div>`}

        <div class="pagination">
          <button
            class="page-left-right-button"
            ?disabled=${this._currentPage === 1}
            @click=${() => this.handlePageChange('back')}
          >
            <
          </button>

          ${this.createPagination().map((page, index, array) => {
            return html`<button
              class=${this._currentPage === page
                ? 'current-page page-button'
                : 'page-button'}
              @click=${() => {
                if (page === '..') {
                  if (index === 1) {
                    this._currentPage = array[2] - 1;
                  } else {
                    this._currentPage = array[4] + 1;
                  }

                  return;
                }
                this._currentPage = page;
              }}
            >
              ${page}
            </button>`;
          })}

          <button
            class="page-left-right-button"
            ?disabled=${this._currentPage === this._maxPage}
            @click=${() => this.handlePageChange('forward')}
          >
            >
          </button>
        </div>
      </div>

      ${this._showModal
        ? html`<delete-record-modal
            .firstName=${this._employeeToBeDeleted.firstName}
            .lastName=${this._employeeToBeDeleted.lastName}
            .closeModal=${this.handleCloseModal.bind(this)}
            .confirmDelete=${this.handleDeleteRecord.bind(this)}
          ></delete-record-modal>`
        : ''}
    `;
  }
}

window.customElements.define('employee-records', EmployeeRecords);
