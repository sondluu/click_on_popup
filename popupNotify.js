
const template = document.createElement('template');
template.innerHTML = `

    <style>

        .tooltip-container {
            display: inline-block;
            positive: relative;
            z-index: 2;
        }

        .cancel {
            display: none;
            width: 1em;
        }

        .alert {
            width: 1.5em;
        }

        img {
            cursor: pointer;
        }


        .notify-container {
            position: absolute;
            // bottom: 125%;
            z-index: 9;
            width: 300px;
            background: white;
            box-shadow: 5px 5px 10px rgba(0,0,0,.1);
            font-size: .8em;
            padding: 1em;
            border-radius: .5em;
            transform: scale(0);
            transform-origin: bottom left;
            transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
        }





    </style>


  



    
    <div class="tooltip-container">
    
    <img class="cancel" src="https://s2.svgbox.net/octicons.svg?ic=x-circle-fill-bold&color=000000" width="32" height="32">
    
    <img class="alert" src="https://s2.svgbox.net/hero-solid.svg?ic=table&color=000000" width="32" height="32">

    
    
    <div class="notify-container">
        <slot name="message" />
    </div>



    </div>

`;







class PopupNotify extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

    tooltip(expandState) {
        const tooltip = this.shadowRoot.querySelector('.notify-container');
        const alert = this.shadowRoot.querySelector('.alert');
        const cancel = this.shadowRoot.querySelector('.cancel');

        if(expandState == true) {
            tooltip.style.transform = 'scale(1)';
            alert.style.display = 'none';
            cancel.style.display = 'block';
            expandState = false;
        } else {
            tooltip.style.transform = 'scale(0)';
            cancel.style.display = 'none';
            alert.style.display = 'block';
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.alert').addEventListener('click', () => {
            this.tooltip(true)
        })
        this.shadowRoot.querySelector('.cancel').addEventListener('click', () => {
            this.tooltip(false)
        })
    }
}


window.customElements.define('popup-notify', PopupNotify)