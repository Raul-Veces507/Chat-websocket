class Usuarios {
    constructor() {
        this.personas = [];
    }
    agregarPersonas(id, nombre, sala,ipdc) {
        let persona = { id, nombre, sala,ipdc };
        this.personas.push(persona);



        return this.personas;
    }
    getPersona(ipdc) {
        let persona = this.personas.filter(persona => persona.ipdc === ipdc)[0];

        return persona;
    }
    getPersonas() {
        return this.personas;
    }
    getPersonasSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }
    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;
    }

}

module.exports = {
    Usuarios
}