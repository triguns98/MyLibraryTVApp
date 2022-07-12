class Connection extends HTMLElement{
    constructor(){
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const connectionStatus = document.createElement('connection-status');
    }
}