import { 
    dataCita, 
    validateCita,
    createDB
} from '../functions.js';
import {
    form,
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput
} from '../references.js';
import '../../css/bootstrap.css';

class App {
    constructor() {
        this.initApp();
    }

    initApp() {
        document.addEventListener( 'DOMContentLoaded', createDB );
    
        form.addEventListener( 'submit', validateCita );
        
        mascotaInput.addEventListener( 'input', dataCita );
        propietarioInput.addEventListener( 'input', dataCita );
        telefonoInput.addEventListener( 'input', dataCita );
        fechaInput.addEventListener( 'input', dataCita );
        horaInput.addEventListener( 'input', dataCita );
        sintomasInput.addEventListener( 'input', dataCita );
    }
}

export default App;