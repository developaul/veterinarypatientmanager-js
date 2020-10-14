import { content, containerCitas } from '../componentes.js';

export class UI {
    showAlert( message, type ) {
        const divMessage = document.createElement( 'div' );
        divMessage.classList.add( 'text-center', 'alert', 'd-block', 'col-12' );
        divMessage.textContent = message;

        divMessage.classList.add( ( type ) ? 'alert-danger' : 'alert-success' );

        content.insertBefore( divMessage, document.querySelector( '.agregar-cita' ) );

        setTimeout( () => divMessage.remove(), 5000 );
    }

    cleanHTML() {
        while( containerCitas.firstChild ) { containerCitas.removeChild( containerCitas.firstChild ); }
    }
}