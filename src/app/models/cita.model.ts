import { Usuario } from "./usuario.model";

export class Cita {
    idCita?: any;
    usuarioPaciente?: Usuario;
    usuarioDoctor?: Usuario;
    fechaCita?: string;
}
