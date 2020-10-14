import { Cita, UI } from './classes/index.js';
import '../css/bootstrap.css';



// References
export const content            = document.querySelector( '#contenido' ),
             form               = document.querySelector( '#nueva-cita' ),
             containerCitas     = document.querySelector( '#citas' ),
             mascotaInput       = document.querySelector( '#mascota' ),
             propietarioInput   = document.querySelector( '#propietario' ),
             telefonoInput      = document.querySelector( '#telefono' ),
             fechaInput         = document.querySelector( '#fecha' ),
             horaInput          = document.querySelector( '#hora' ),
             sintomasInput      = document.querySelector( '#sintomas' );

// Variables
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

let edicion;

// Instancias
const ui = new UI(),
      administradorCitas = new Cita();



// Functions
// Obtiene constantemente los valore del formulario
const dataCita = event => {
    citaObj[ event.target.name ] = event.target.value;
}

// Reseteando el objeto
const resetObject = () => {
    const properties = Object.keys( citaObj );
    for( const property of properties ) { citaObj[ property ] = ''; }
}

// Agrega una nueva cita o la actualiza
const addCita = () => {
    if( edicion ) {
        ui.showAlert( 'Editado correctamente' );

        // Pasar el objeto de la cita a edición
        administradorCitas.editCita( { ...citaObj } );

        // Quitar modo edición
        form.querySelector( 'button[type="submit"]' ).textContent = 'Crear Cita';
        edicion = false;
    } else {
        // Asignar un id a la nueva cita
        citaObj.id = Date.now();

        // Agregamos una nueva cita al array de citas
        administradorCitas.addCita( { ...citaObj } );

        // Mostrar mensaje de agregado correctamente
        ui.showAlert( 'Se agregó correctamente' );
    }

    // Reiniciar Objeto
    resetObject();

    // Reiniciar Formulario
    form.reset();

    // Imprime las citas en pantalla
    ui.showCitas( administradorCitas );
}

// Valida la nueva cita ingresada
const validateCita = event => {
    event.preventDefault();
    
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj

    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {
        ui.showAlert( 'Todos los campos son obligatorios', 'error' );
        return;
    }

    addCita();
}

// Elimina una cita por su id
export const deleteCita = id => {
    administradorCitas.deleteCita( id );

    ui.showCitas( administradorCitas );

    ui.showAlert( 'La cita se elimino correctamente' );
}

export const loadEdition = cita => {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambiar el texto del boton
    form.querySelector( 'button[type="submit"]' ).textContent = 'Guardar Cambios';
    edicion = true;
}

// Events
export const startEventListeners = () => {
    form.addEventListener( 'submit', validateCita );
    
    mascotaInput.addEventListener( 'input', dataCita );
    propietarioInput.addEventListener( 'input', dataCita );
    telefonoInput.addEventListener( 'input', dataCita );
    fechaInput.addEventListener( 'input', dataCita );
    horaInput.addEventListener( 'input', dataCita );
    sintomasInput.addEventListener( 'input', dataCita );
}