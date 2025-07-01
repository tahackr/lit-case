import {LitElement, css, html} from 'lit';

export class DeleteRecordModal extends LitElement {
  static properties = {
    firstName: {},
    lastName: {},
    closeModal: {},
    confirmDelete: {},
  };

  static styles = css`
    .modal-background {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: #00000026;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-window {
      background-color: white;
      padding: 12px;
      border-radius: 4px;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ff6200;
    }

    .modal-heading {
      margin: 0px;
    }

    .modal-top-close-button {
      background-color: white;
      border: none;
      cursor: pointer;
      padding: 0px;
      color: #ff6200;
      height: 16px;
    }

    .action-buttons-div {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .message {
      margin: 20px 0px;
      font-size: 14px;
    }

    .action-button {
      padding: 6px;
      border-radius: 6px;
      cursor: pointer;
    }

    .action-button-cancel {
      background-color: white;
      border: 1px solid #525199;
      color: #525199;
    }

    .action-button-proceed {
      background-color: #ff6200;
      border: none;
      color: white;
    }

    .action-button-cancel:hover {
      background-color: #eee;
    }

    .action-button-proceed:hover {
      background-color: #ff8235;
    }
  `;

  constructor() {
    super();
  }

  handleBackgroundClick(e) {
    if (e.target === e.currentTarget) {
      this.closeModal();
    }
  }

  render() {
    return html`
      <div
        @click=${(e) => this.handleBackgroundClick(e)}
        class="modal-background"
      >
        <div class="modal-window">
          <div class="modal-header">
            <h3 class="modal-heading">Are you sure?</h3>
            <button class="modal-top-close-button" @click=${this.closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
                version="1.1"
              >
                <title>
                  action / 9 - action, cancel, close, delete, exit, remove, x
                  icon
                </title>
                <g
                  id="Free-Icons"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <g
                    transform="translate(-157.000000, -158.000000)"
                    id="Group"
                    stroke="#000000"
                    stroke-width="2"
                  >
                    <g
                      transform="translate(153.000000, 154.000000)"
                      stroke="#ff6200"
                      id="Shape"
                    >
                      <path d="M19,5 L5,19 M19,19 L5,5"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </div>
          <p class="message">
            Selected employee record of ${this.firstName} ${this.lastName} will
            be deleted
          </p>
          <div class="action-buttons-div">
            <button
              class="action-button action-button-proceed"
              @click=${this.confirmDelete}
            >
              Proceed
            </button>
            <button
              class="action-button action-button-cancel"
              @click=${this.handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('delete-record-modal', DeleteRecordModal);
