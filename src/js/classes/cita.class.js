export class Cita {
    constructor() {
        this.citas = [];
    }

    addCita( cita ){
        this.citas = [ ...this.citas, cita ]; 
        this.syncLocalStorage();
    }

    deleteCita( id ) {
        this.citas = this.citas.filter( cita => cita.id !== id );
        this.syncLocalStorage();
    }

    editCita( currentCita ) {
        this.citas = this.citas.map( cita => cita.id === currentCita.id ? currentCita : cita );
        this.syncLocalStorage();
    }

    syncLocalStorage() {
        localStorage.setItem( 'citas', JSON.stringify( this.citas ) );
    }
}