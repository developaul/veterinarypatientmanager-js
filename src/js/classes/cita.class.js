export class Cita {
    constructor() {
        this.citas = [];
    }

    addCita( cita ){
        this.citas = [ ...this.citas, cita ]; 
    }

    deleteCita( id ) {
        this.citas = this.citas.filter( cita => cita.id !== id );
    }
    
}