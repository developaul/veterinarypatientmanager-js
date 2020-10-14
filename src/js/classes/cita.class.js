export class Cita {
    constructor() {
        this.citas = [];
    }

    addCita( cita ){
        this.citas = [ ...this.citas, cita ]; 
    }
}