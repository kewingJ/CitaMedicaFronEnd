import { Usuario } from "./usuario.model";

export class Disponibilidad {
    idDisponibilidad?: any;
    dia?: string;
    horaInicio?: string;
    horaFin?: string;
    usuarioDoctor?: Usuario;
}
