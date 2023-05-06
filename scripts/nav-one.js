const template1 = document.createElement("template");
template1.innerHTML = `
  <style>
    button {
      background: transparent;
    }
    /* button one */
    .button-one {
      --button-color: #333;
    }

    .button-one .line {
      transition: transform 100ms ease-in 300ms, opacity 300ms 100ms;
      transform-origin: center;
    }

    .button-one[aria-expanded="true"] .line {
      transition: transform 100ms ease-in, opacity 300ms 100ms;
    }

    .button-one[aria-expanded="true"] .top {
      transform: translateY(10px) rotate(40deg);
    }

    .button-one[aria-expanded="true"] .middle {
      opacity: 0;
    }

    .button-one[aria-expanded="true"] .bottom {
      transform: translateY(-20px) rotate(-40deg);
    }

    /* menu */
    .menu {
      display: none;
      background-color: #f9f9f9;
      border: 1px solid #ccc;
      padding: 10px;
      position: absolute;
      min-width: 200px;
      z-index: 1;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    .menu.active {
      display: block;
    }
  </style>
  <button class="button-one" aria-controls="primary-navigation" aria-expanded="false">
    <slot name="svg-content">
      <svg fill="var(--button-color)" class="hamburger" viewBox="0 0 100 100" width="50">
        <rect class="line top" width="80" height="10" x="10" y="25" rx="5">
        </rect>
        <rect class="line middle" width="80" height="10" x="10" y="45" rx="5">
        </rect>
        <rect class="line bottom" width="80" height="10" x="10" y="65" rx="5">
        </rect>
      </svg>
    </slot>
  </button>
  <div class="menu">
  <slot name="menu-items"></slot>
  </div>
`;

class NavOne extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template1.content.cloneNode(true));

    this.button = this.shadowRoot.querySelector(".button-one");
    this.menu = this.shadowRoot.querySelector(".menu");
    this._attachEventListeners();
  }

  _attachEventListeners() {
    this.button.addEventListener("click", () => {
      const currentState = this.button.getAttribute("aria-expanded");

      if (currentState === "false") {
        this.button.setAttribute("aria-expanded", "true");
        this.menu.classList.add("active");
      } else {
        this.button.setAttribute("aria-expanded", "false");
        this.menu.classList.remove("active");
      }
    });
  }
}

window.customElements.define("nav-one", NavOne);

export default NavOne;
