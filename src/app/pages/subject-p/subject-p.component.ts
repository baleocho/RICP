import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute} from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { Observable } from 'rxjs';
import { User, Role } from '../../auth-files/_models';
import { UserService, AuthenticationService } from '../../auth-files/_services';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-subject-p',
  templateUrl: './subject-p.component.html',
  styleUrls: ['./subject-p.component.scss']
})
export class SubjectPComponent implements OnInit {
  wrapperToggled: boolean = false;
  currentUser: User;
  currentMateria: any;
  idMateria:any;
  activitysMateria:any;
  constructor(private share: ShareService, private route:ActivatedRoute, private http: HttpService, private authenticationService: AuthenticationService) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.idMateria = params.id;
      this.getClaseData(this.idMateria);  
    });
      //OBTENER VARIABLES GLOBALES COMPARTIDAS DEL SERVICIO SHARE DESDE COMPONENTE SEARCH
      this.share.currentWrapperToggled.subscribe(data => {
        this.wrapperToggled = data;
      }, error => {
        console.log(error);
      });
  }

  getClaseData(idClave){
    let body = {idClave:idClave};
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/getClasesByClave",body).subscribe(res => {
        //Informacion del resultado de la consulta
        this.currentMateria = res.data[0];
        this.getActividadDeMateria(this.currentMateria.idClase);
      }, error => {
        console.log(error);
      });
    }, 100);
  }
  getActividadDeMateria(idClase){
    let body = {idClase:idClase};
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/getActivitysClaseByIdClase",body).subscribe(res => {
        //Informacion del resultado de la consulta
        this.activitysMateria = res.data;
        console.log(res.data);
      }, error => {
        console.log(error);
      });
    }, 100);
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
}
