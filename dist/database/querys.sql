---Consulta para ver todos los maestros en bd
  Create VIEW teachers_in_system_view AS
  select nombre,matricula,correo,telefono from tb_usuario
  where tipo='Maestro';

------Consulta para ver todos los alumnos en bd
  Create VIEW students_in_system_view AS
  select nombre,matricula,correo,telefono from tb_usuario
  where tipo='Alumno';

------Consulta para ver todos los administradores en bd
  Create VIEW administrators_in_system_view AS
  select nombre,matricula,correo,telefono from tb_usuario
  where tipo='Administrador';

---Consulta para ver todas las materias en bd
  create VIEW all_subjects_in_system_view AS
  select
  distinct c.nombreClase,
  c.aula,
  c.claveClase,
  nm.nombre,
  LEFT(cdh.horaInicio,5) as horaInicio,
  LEFT(cdh.horaFin,5) as horaFin,
  cdh.dia
from
  tb_usuario u
  inner join tb_alumno_clase ac on u.idUsuario = ac.idAlumno
  inner join tb_clase c on ac.idClase = c.idClase
  inner join tb_clase_dia_hora cdh on cdh.idClase=c.idClase
  inner join (
    select
      u.nombre,
      c.idClase
    from
      tb_usuario u
      inner join tb_clase c on u.idUsuario = c.idUsuario
  ) nm on nm.idClase = c.idClase
  order by c.nombreClase;

--Obtener materias de alumno para menu
  select distinct
    u.idUsuario,
    c.nombreClase
  from tb_usuario u
    inner join tb_alumno_clase ac on ac.idAlumno = u.idUsuario
    inner join tb_clase c on  c.idClase = ac.idClase
  where u.idUsuario = ?

--Obtener promedio general de cada materia (reporte 1)
  select
    clase.nombreClase,
    cast(avg(calificar.calificacion) as decimal(10,2))
  from tb_calificar_entrega calificar
    inner join tb_actividad_entrega actividad_entrega on calificar.idActividadEntrega = actividad_entrega.idActividadEntrega  
    inner join tb_actividad actividad on actividad_entrega.idActividad = actividad.idActividad
    inner join tb_clase clase on actividad.idClase = clase.idClase
  group by clase.nombreClase ASC;

  select
    clase.nombreClase,
    actividad.nombreActividad
  from tb_calificar_entrega calificar
    inner join tb_actividad_entrega actividad_entrega on calificar.idActividadEntrega = actividad_entrega.idActividadEntrega  
    inner join tb_actividad actividad on actividad_entrega.idActividad = actividad.idActividad
    inner join tb_clase clase on actividad.idClase = clase.idClase
    where actividad_entrega.idAlumno=1 
  group by clase.nombreClase ASC;

--Obtener porcentajes de actividades entregadas a tiempo y tarde (reporte 2)
--Identifica si la entrega es a tiempo
create view entregas_totales_in_system_view as 
  SELECT 
    tb_actividad_entrega.fechaModificacion, 
    tb_actividad.fechaEntrega, 
  CASE 
    WHEN tb_actividad_entrega.fechaModificacion > tb_actividad.fechaEntrega THEN 'TARDE' 
    WHEN tb_actividad_entrega.fechaModificacion < tb_actividad.fechaEntrega THEN 'A TIEMPO' 
  END 
  FROM tb_actividad_entrega 
    join tb_actividad on tb_actividad.idActividad=tb_actividad_entrega.idActividad
  where tb_actividad.idActividad = tb_actividad_entrega.idActividad;

--Saca el promedio de las entregas
create view promedio_entregas_totales_in_system_view as
SELECT
 count(Name_exp_3) as cantidad,
 concat(round((select COUNT(*) from entregas_totales_in_system_view WHERE Name_exp_3="TARDE" )*100)/(select COUNT(*) from entregas_totales_in_system_view)," ","%")  as promedioTIEMPO,
 concat(round((select COUNT(*) from entregas_totales_in_system_view WHERE Name_exp_3="A TIEMPO" )*100)/(select COUNT(*) from entregas_totales_in_system_view)," ","%")  as promedioTARDE
FROM entregas_totales_in_system_view;
