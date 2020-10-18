import { Cita, UI } from './classes/index.js';
import { 
    form, 
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput
} from './references.js';

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
export let DB;


// Instancias
export const ui = new UI(),
             administradorCitas = new Cita();


// Functions
// Obtiene constantemente los valore del formulario
export const dataCita = event => {
    citaObj[ event.target.name ] = event.target.value;
}

// Reseteando el objeto
export const resetObject = () => {
    for( const property of Object.keys( citaObj ) ) { citaObj[ property ] = ''; }
}

// Agrega una nueva cita o la actualiza
const addCita = () => {
    if( edicion ) {
        ui.showAlert( 'Editado correctamente' );

        // Pasar el objeto de la cita a edición
        administradorCitas.editCita( { ...citaObj } );

        // Editando en indexDB
        const transaction = DB.transaction( ['citas'], 'readwrite' );
        const objectStore = transaction.objectStore( 'citas' );

        objectStore.put( citaObj );

        transaction.oncomplete = () => {
            ui.showAlert( 'Guardado Correctamente' );

            // Quitar modo edición
            form.querySelector( 'button[type="submit"]' ).textContent = 'Crear Cita';
            edicion = false;    
        }

        transaction.onerror = () => {
            console.error( 'Hubo un error, editando el registro' );
        }

    } else {
        // Asignar un id a la nueva cita
        citaObj.id = Date.now();

        // Agregamos una nueva cita al array de citas
        administradorCitas.addCita( { ...citaObj } );

        // Insertando en la base de datos indexDB
        const transaction = DB.transaction( ['citas'], 'readwrite' );

        // Habilitando object store
        const objectStore = transaction.objectStore( 'citas' );

        // Insertando en la base de datos
        objectStore.add( citaObj );

        transaction.oncomplete = () => {
            // Mostrar mensaje de agregado correctamente
            ui.showAlert( 'Se agregó correctamente' );
        }

        transaction.onerror = () => {
            console.error( 'Hubo un error, agregando el nuevo registro' );
        }
    }

    // Reiniciar Objeto
    resetObject();

    // Reiniciar Formulario
    form.reset();

    // Imprime las citas en pantalla
    ui.showCitas( administradorCitas );
}

// Valida la nueva cita ingresada
export const validateCita = event => {
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
    const transaction = DB.transaction( ['citas'], 'readwrite' );
    const objectStore = transaction.objectStore( 'citas' );

    objectStore.delete( id );

    transaction.oncomplete = () => {
        ui.showCitas();
        ui.showAlert( 'La cita se elimino correctamente' );
    }

    transaction.onerror = () => {
        console.error( 'Hubo un error eliminando un registro' );
    }
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

export const createDB = () => {
    // Crear base de datos en versión 1.0
    const createDB = window.indexedDB.open( 'citas', 1 )

    // si hay un error
    createDB.onerror = () => {
        console.error( 'Hubo un error, su navegador no soporta indexDB' );
    }

    // si todo sale bien
    createDB.onsuccess = () => {
        DB = createDB.result;
    }

    // Definiendo Schema
    createDB.onupgradeneeded = event => {
        const db = event.target.result;

        // referencia de la base de datos
        const objectStore = db.createObjectStore( 'citas', {
            keyPath: 'id',
            autoIncrement: true
        });

        objectStore.createIndex( 'mascota', 'mascota', { unique: false } );
        objectStore.createIndex( 'propietario', 'propietario', { unique: false } );
        objectStore.createIndex( 'telefono', 'telefono', { unique: false } );
        objectStore.createIndex( 'fecha', 'fecha', { unique: false } );
        objectStore.createIndex( 'hora', 'hora', { unique: false } );
        objectStore.createIndex( 'sintomas', 'sintomas', { unique: false } );
    }
}