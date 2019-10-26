import { Role } from "./role";

export class User {
    idUsuario: number;
    matricula: string;
    nombre: string;
    fechaNacimiento: string;
    correo: string;
    telefono: string;
    descripcion: string;
    contrasena: string;
    fotoUrl: string;
    tipo: Role;
    fechaCreacion: string;
    fechaModificacion: string;
    token?: string;
}