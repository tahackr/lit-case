import {LitElement, css, html} from 'lit';

export class NavBar extends LitElement {
  static properties = {
    _path: {state: true},
  };
  createContext;
  static styles = css`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
    }

    .navbar-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .navbar-logo {
      width: 24px;
    }

    .navbar-ing {
      font-size: 14px;
      margin: 0;
    }

    .navbar-anchor,
    .navbar-anchor:hover,
    .navbar-anchor:active,
    .navbar-anchor:visited,
    .navbar-anchor:link {
      text-decoration: none;
      color: #fa9556;
      font-size: 12px;
    }

    .navbar-anchor {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .navbar-anchor-div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .navbar .active {
      color: #ff6200;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  `;

  constructor() {
    super();
    this._path = location.pathname;
    window.addEventListener('vaadin-router-location-changed', (e) => {
      this._path = e.detail.location.pathname;
    });
  }

  render() {
    return html` <div class="navbar">
      <div class="navbar-left">
        <a href="/">
          <img class="navbar-logo" src="./public/inglogo.webp" />
        </a>
        <p class="navbar-ing">ING</p>
      </div>
      <div class="navbar-anchor-div">
        <a class="navbar-anchor ${this._path === '/' ? 'active' : ''}" href="/"
          ><svg
            fill="${this._path === '/' ? '#ff6200' : '#fa9556'}"
            height="200px"
            width="200px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 511 511"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            enable-background="new 0 0 511 511"
            stroke="${this._path === '/' ? '#ff6200' : '#fa9556'}"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path
                  d="m503.5,436h-103.705c7.13-9.007 9.992-20.574 7.837-31.891l-21.252-111.577c-2.674-14.037-12.756-25.563-26.312-30.082l-54.196-18.065c-0.954-0.318-1.927-0.43-2.872-0.366v-14.399c10.341-11.62 16-26.396 16-42.12v-17.734c9.29-3.138 16-11.93 16-22.266v-40c0-26.191-21.309-47.5-47.5-47.5h-64c-10.584,0-19.557,7.033-22.489,16.672-14.267,2.999-25.011,15.682-25.011,30.828v40c0,10.335 6.71,19.127 16,22.266v15.387c0,16.529 6.063,31.796 16,43.459v15.407c-0.945-0.063-1.917,0.048-2.872,0.367l-54.196,18.065c-13.556,4.519-23.638,16.045-26.312,30.082l-21.252,111.577c-2.156,11.317 0.707,22.884 7.837,31.891h-103.705c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5 7.5,7.5h134.67 1.33 16 192 16 1.33 134.67c4.142,0 7.5-3.358 7.5-7.5s-3.358-7.501-7.5-7.501zm-288-177c4.142,0 7.5-3.358 7.5-7.5v-9.919c9.01,5.649 19.437,9.056 30.552,9.39 0.659,0.02 1.315,0.029 1.971,0.029 11.614,0 22.742-3.101 32.477-8.927v9.427c0,4.142 3.358,7.5 7.5,7.5 0.105,0 0.207-0.011 0.311-0.016-1.953,18.497-19.284,33.016-40.311,33.016s-38.358-14.519-40.311-33.016c0.104,0.005 0.206,0.016 0.311,0.016zm-24.5-111.5v-40c0-9.098 7.402-16.5 16.5-16.5 4.142,0 7.5-3.358 7.5-7.5 0-4.687 3.813-8.5 8.5-8.5h64c17.92,0 32.5,14.579 32.5,32.5v40c0,1.442-0.364,2.8-1,3.992v-11.992c0-12.958-10.542-23.5-23.5-23.5h-80c-12.958,0-23.5,10.542-23.5,23.5v11.992c-0.636-1.192-1-2.55-1-3.992zm16-8c0-4.687 3.813-8.5 8.5-8.5h80c4.687,0 8.5,3.813 8.5,8.5v48c0,13.23-5.23,25.593-14.727,34.809-9.493,9.212-22.035,14.065-35.271,13.669-25.917-0.778-47.002-23.579-47.002-50.826v-45.652zm-47.5,296.5c-0.276,0-0.5-0.225-0.5-0.5v-104c0-0.275 0.224-0.5 0.5-0.5h192c0.276,0 0.5,0.225 0.5,0.5v104c0,0.275-0.224,0.5-0.5,0.5h-192zm208,0h-0.525c0.005-0.167 0.025-0.331 0.025-0.5v-104c0-8.547-6.953-15.5-15.5-15.5h-192c-8.547,0-15.5,6.953-15.5,15.5v104c0,0.169 0.02,0.333 0.025,0.5h-0.525-1.33c-7.326,0-14.205-3.237-18.875-8.881-4.67-5.644-6.563-13.007-5.191-20.203l21.252-111.577c1.658-8.706 7.912-15.855 16.32-18.658l44.75-14.917c3.342,25.452 26.757,45.236 55.074,45.236s51.732-19.784 55.075-45.236l44.75,14.916c8.408,2.803 14.662,9.953 16.32,18.659l21.252,111.577c1.371,7.196-0.521,14.56-5.191,20.203-4.67,5.644-11.55,8.881-18.875,8.881h-1.331z"
                ></path>
                <path
                  d="m255.5,364c-12.958,0-23.5,10.542-23.5,23.5s10.542,23.5 23.5,23.5 23.5-10.542 23.5-23.5-10.542-23.5-23.5-23.5zm0,32c-4.687,0-8.5-3.813-8.5-8.5s3.813-8.5 8.5-8.5 8.5,3.813 8.5,8.5-3.813,8.5-8.5,8.5z"
                ></path>
              </g>
            </g>
          </svg>
          <span>Employees</span>
        </a>
        <a
          class="navbar-anchor ${this._path === '/add-employee'
            ? 'active'
            : ''}"
          href="add-employee"
          ><svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="${this._path === '/' ? '#fa9556' : '#ff6200'}"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M4 12H20M12 4V20"
                stroke="${this._path === '/' ? '#fa9556' : '#ff6200'}"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
          <span>Add New</span>
        </a>
      </div>
    </div>`;
  }
}

window.customElements.define('nav-bar', NavBar);
