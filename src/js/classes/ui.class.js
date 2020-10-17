import { content, containerCitas } from '../references.js';
import {  deleteCita, loadEdition } from '../functions.js';

class UI {
    showAlert( message, type ) {
        const divMessage = document.createElement( 'div' );
        divMessage.classList.add( 'text-center', 'alert', 'd-block', 'col-12' );
        divMessage.textContent = message;

        divMessage.classList.add( ( type ) ? 'alert-danger' : 'alert-success' );

        content.insertBefore( divMessage, document.querySelector( '.agregar-cita' ) );

        setTimeout( () => divMessage.remove(), 5000 );
    }

    showCitas( { citas } ) {
        this.cleanHTML();

        citas.forEach( cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
            
            const divCita = document.createElement( 'div' );
            divCita.classList.add( 'cita', 'p-3' );
            divCita.dataset.id = id;
            
            
            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement( 'h2' );
            mascotaParrafo.classList.add( 'card-title', 'font-weight-bolder' );
            mascotaParrafo.textContent = mascota;
            
            const propietarioParrafo = document.createElement( 'p' );
            propietarioParrafo.classList.add( 'card-title', 'font-weight-bolder' );
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${ propietario }`;
            
            const telefonoParrafo = document.createElement( 'p' );
            telefonoParrafo.classList.add( 'card-title', 'font-weight-bolder' );
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${ telefono }`;

            const fechaParrafo = document.createElement( 'p' );
            fechaParrafo.classList.add( 'card-title', 'font-weight-bolder' );
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${ fecha }`;
            
            const horaParrafo = document.createElement( 'p' );
            horaParrafo.classList.add( 'card-title', 'font-weight-bolder' );
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${ hora }`;
            
            const sintomasParrafo = document.createElement( 'p' );
            sintomasParrafo.classList.add( 'card-title', 'font-weight-bolder' );
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${ sintomas }`;
            

            // Botón para eliminar esta cita
            const btnEliminar = document.createElement( 'button' );
            btnEliminar.classList.add( 'btn', 'btn-danger', 'mr-2' );
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => { deleteCita( id ); }
            
            // Botón para editar
            const btnEditar = document.createElement( 'button' );
            btnEditar.classList.add( 'btn', 'btn-info' );
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = () => { loadEdition( cita ); }
            
            // Agregar los parados al divCita
            divCita.appendChild( mascotaParrafo );
            divCita.appendChild( propietarioParrafo );
            divCita.appendChild( telefonoParrafo );
            divCita.appendChild( fechaParrafo );
            divCita.appendChild( horaParrafo );
            divCita.appendChild( sintomasParrafo );
            divCita.appendChild( btnEliminar );
            divCita.appendChild( btnEditar );
            
            // Agregar la citas al HTML
            containerCitas.appendChild( divCita );
        });
    }
        
    cleanHTML() {
        while( containerCitas.firstChild ) { containerCitas.removeChild( containerCitas.firstChild ); }
    }
}

export default UI;