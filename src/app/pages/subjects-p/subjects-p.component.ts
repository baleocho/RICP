import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { AuthenticationService } from 'src/app/auth-files/_services';
import { User, Role } from 'src/app/auth-files/_models';

@Component({
  selector: 'app-subjects-p',
  templateUrl: './subjects-p.component.html',
  styleUrls: ['./subjects-p.component.scss']
})
export class SubjectsPComponent implements OnInit {
  wrapperToggled: boolean = false;
  materiasHorarios: any[] = [];
  personaSubs: Subscription = null;
  persona: any;
  currentUser: User;
  materiasHorariosAlumno: any[] = [];
  materiasHorariosMaestro: any[] = [];
  constructor(private share: ShareService, private http: HttpService, private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.share.currentWrapperToggled.subscribe(data => {
      this.wrapperToggled = data;
    }, error => {
      console.log(error);
    });
    this.getClases();
    if (this.isAlumno)
      this.getClasesbyIdAlumno();
    else if (this.isMaestro)
      this.getClasesbyIdMaestro();
  }
  get isAlumno() {
    return this.currentUser && this.currentUser.tipo === Role.Alumno;
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.tipo === Role.Administrador;
  }
  get isMaestro() {
    return this.currentUser && this.currentUser.tipo === Role.Maestro;
  }
  getClases() {
    // Validar el obserbable si no esta null
    if (this.personaSubs) {
      this.personaSubs.unsubscribe(); // En caso de no ser null desubscribirlo para evitar llamadas pendientes
      this.personaSubs = null; // Igualarlo a null para reiniciar la variable
    }
    // Parametros a enviar
    let body = {};
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.personaSubs = this.http.get("/api/getClases").subscribe(res => {
        //Informacion del resultado de la consulta
        this.materiasHorarios = res.data;
      }, error => {
        console.log(error);
      });
    }, 100);
  }
  subjectLink(id) {
    return '/subject?clave=' + id;
  }

  getClasesbyIdAlumno() {
    // Parametros a enviar
    let body = {
      idUsuario: this.currentUser.idUsuario
    };
    this.http.post("/api/getClasesByIdAlumno", body).subscribe(res => {
      //Informacion del resultado de la consulta
      this.materiasHorariosAlumno = res.data;
    }, error => {
      console.log(error);
    });

  }
  getClasesbyIdMaestro() {
    // Parametros a enviar
    let body = {
      idUsuario: this.currentUser.idUsuario
    };
    this.http.post("/api/getClasesByIdMaestro", body).subscribe(res => {
      //Informacion del resultado de la consulta
      this.materiasHorariosMaestro[0] = res.data[0];
      this.materiasHorariosMaestro[1] = res.data[1];

    }, error => {
      console.log(error);
    });

  }

}
