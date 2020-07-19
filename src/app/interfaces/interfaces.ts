export interface Pregunta {
    id: number;
    preguntaTexto: string;
    respuestas: Respuesta[];
}

export interface Respuesta {
    respuestaTexto: string;
    valor: number;
}
