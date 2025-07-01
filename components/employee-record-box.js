import {LitElement, css, html} from 'lit';
import {Router} from '@vaadin/router';

export class EmployeeRecordBox extends LitElement {
  static properties = {
    employee: {},
    handleOpenModal: {},
    handleCloseModal: {},
    changeEmployeeToBeDeleted: {},
  };

  static styles = css`
    .box {
      padding: 20px;
      background-color: white;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 0px;
      grid-row-gap: 16px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    .box-label {
      color: #777;
      font-size: 14px;
      margin: 0px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .box-value {
      margin: 0px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .box-label-value-div {
      overflow: hidden;
      white-space: nowrap;
    }

    .box-buttons-div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .box-button {
      padding: 0;
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: white;
      padding: 8px 14px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .box-edit-button {
      background-color: #525199;
    }

    .box-delete-button {
      background-color: #ff6200;
    }

    .box-buttons-div p {
      margin: 0;
    }

    .box-buttons-div svg {
      width: 16px;
      height: 16px;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`<div class="box">
      <div class="box-label-value-div">
        <p class="box-label">First Name</p>
        <p class="box-value">${this.employee.firstName}</p>
      </div>
      <div class="box-label-value-div">
        <p class="box-label">Last Name</p>
        <p class="box-value">${this.employee.lastName}</p>
      </div>
      <div class="box-label-value-div">
        <p class="box-label">Date of Employment</p>
        <p class="box-value">${this.employee.dateOfEmployment}</p>
      </div>
      <div class="box-label-value-div">
        <p class="box-label">Date of Birth</p>
        <p class="box-value">${this.employee.dateOfBirth}</p>
      </div>
      <div class="box-label-value-div">
        <p class="box-label">Phone</p>
        <p class="box-value">${this.employee.phone}</p>
      </div>
      <div class="box-label-value-div">
        <p class="box-label">Email</p>
        <p class="box-value">${this.employee.email}</p>
      </div>
      <div class="box-label-value-div">
        <p class="box-label">Department</p>
        <p class="box-value">${this.employee.department}</p>
      </div>
      <div class="box-label-value-div">
        <p class="box-label">Position</p>
        <p class="box-value">${this.employee.position}</p>
      </div>
      <div class="box-buttons-div">
        <button
          @click=${() => {
            Router.go(`/edit-employee?id=${this.employee.id}`);
          }}
          class="box-button box-edit-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#fff"
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
          <p>Edit</p>
        </button>
        <button
          class="box-button box-delete-button"
          @click=${() => {
            this.handleOpenModal();
            this.changeEmployeeToBeDeleted(this.employee);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
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
          <p>Delete</p>
        </button>
      </div>
    </div>`;
  }
}

window.customElements.define('employee-record-box', EmployeeRecordBox);
