create table tb_usuario(
idUsuario int not null primary key auto_increment,
matricula varchar(10) not null,
nombre varchar(70) not null,
fechaNacimiento date not null,
correo varchar(100) not null,
telefono varchar(15),
descripcion varchar(500) default '-',
contrasena varchar(100) not null,
fotoUrl varchar(150),
tipo enum('Alumno','Maestro','Administrador') not null,
fechaCreacion timestamp default current_timestamp,
fechaModificacion timestamp default current_timestamp on update current_timestamp);

create table tb_clase(
idClase int not null primary key auto_increment,
idUsuario int not null,
claveClase varchar(7) not null,
nombreClase varchar(50) not null,
aula varchar(30) not null,
descripcion varchar(500) not null,
contrasena varchar(100) not null,
fechaCreacion timestamp default current_timestamp,
fechaModificacion timestamp default current_timestamp on update current_timestamp);

create table tb_clase_dia_hora(
idClaseDiaHora int not null primary key auto_increment,
idClase int not null,
horaInicio time not null,
horaFin time not null,
dia enum('Lunes','Martes','Miercoles','Jueves','Viernes','Sabado') not null,
fechaCreacion timestamp default current_timestamp,
fechaModificacion timestamp default current_timestamp on update current_timestamp);

create table tb_alumno_clase(
idAlumnoClase int not null primary key auto_increment,
idClase int not null,
idAlumno int not null);

create table tb_actividad(
idActividad int not null primary key auto_increment,
idClase int not null,
nombreActividad varchar(50) not null,
descripcionActividad varchar(500),
fechaEntrega date not null,
archivoApoyo1 varchar(150),
archivoApoyo2 varchar(150),
archivoApoyo3 varchar(150),
fechaCreacion timestamp default current_timestamp,
fechaModificacion timestamp default current_timestamp on update current_timestamp);

create table tb_actividad_entrega(
idActividadEntrega int not null primary key auto_increment,
idClase int not null,
idActividad int not null,
idAlumno int not null,
urlArchivo varchar(150) not null,
fechaCreacion timestamp default current_timestamp,
fechaModificacion timestamp default current_timestamp on update current_timestamp);

create table tb_calificar_entrega(
idCalificarEntrega int not null primary key auto_increment,
idActividadEntrega int not null,
calificacion float(3,1) not null,
comentario varchar(500),
fechaCreacion timestamp default current_timestamp,
fechaModificacion timestamp default current_timestamp on update current_timestamp);

create table tb_actividad_agenda(
idActividadAgenda int not null primary key auto_increment,
idAlumno int not null,
idClase int not null,
actividadClase boolean not null,
fechaEntrega date not null,
titulo varchar(50) not null,
descripcionAgenda varchar(500),
estatus enum('Terminado','Eliminado','Pendiente','Fuera de tiempo') not null,
archivoApoyo1 varchar(150),
archivoApoyo2 varchar(150),
archivoApoyo3 varchar(150),
fechaCreacion timestamp default current_timestamp,
fechaModificacion timestamp default current_timestamp on update current_timestamp);

create table tb_asistencia(
idAsistencia int not null primary key auto_increment,
idClase int not null,
idAlumno int not null,
asistencia boolean,
fechaCreacion timestamp default current_timestamp,
fechaModificacion timestamp default current_timestamp on update current_timestamp);

alter table tb_clase add foreign key(idUsuario)
references tb_usuario(idUsuario);

alter table tb_clase_dia_hora add foreign key(idClase)
references tb_clase(idClase);

alter table tb_actividad add foreign key(idClase)
references tb_clase(idClase);

alter table tb_actividad_entrega add foreign key(idClase)
references tb_clase(idClase);

alter table tb_actividad_entrega add foreign key(idActividad)
references tb_actividad(idActividad);

alter table tb_actividad_entrega add foreign key(idAlumno)
references tb_usuario(idUsuario);

alter table tb_calificar_entrega add foreign key(idActividadEntrega)
references tb_actividad_entrega(idActividadEntrega);

alter table tb_actividad_agenda add foreign key(idAlumno)
references tb_usuario(idUsuario);

alter table tb_actividad_agenda add foreign key(idClase)
references tb_clase(idClase);

alter table tb_asistencia add foreign key(idClase)
references tb_clase(idClase);

alter table tb_asistencia add foreign key(idAlumno)
references tb_usuario(idUsuario);

alter table tb_alumno_clase add foreign key(idClase)
references tb_clase(idClase);

alter table tb_alumno_clase add foreign key(idAlumno)
references tb_usuario(idUsuario);