class ConnectionStatus extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"});

        const container = document.createElement('div');
        container.setAttribute('class', this.getAttribute('className'));
        
        const title = document.createElement('h1');
        title.innerText = this.getAttribute('title');

        const description = document.createElement('p');
        description.innerText = this.getAttribute('description');

        const img = document.createElement('img');
        img.setAttribute('src', this.getAttribute('img'));

        shadow.appendChild(container);
        container.appendChild(title);
        container.appendChild(description);
        container.appendChild(img);














        ``
    }
}

customElements.define('connection-status', Connection);