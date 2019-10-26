import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ShareService } from 'src/app/services/share.service';
import { first } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { User, Role } from '../../auth-files/_models';
import { UserService, AuthenticationService } from '../../auth-files/_services';

@Component({
  selector: 'app-home-p',
  templateUrl: './home-p.component.html',
  styleUrls: ['./home-p.component.scss']
})
export class HomePComponent implements OnInit {
  //Colocar spinner
  loading: boolean = false;
  //Slide derecho cerrado
  wrapperToggled: boolean = true;
  //data para cards
  data: any;
  //User information
  currentUser: User;
  materiasHorarios: any[] = [];
  materiasHorariosAlumno: any[] = [];
  materiasHorariosMaestro: any[] = [];
  persona: any;

  constructor(
    private share: ShareService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private http: HttpService,
    private router: Router) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }

  }

  ngOnInit() {
    //Colocar spinner mientras carga
    this.loading = true;
    //OBTENER VARIABLES GLOBALES COMPARTIDAS DEL SERVICIO SHARE DESDE COMPONENTE SEARCH
    this.share.currentWrapperToggled.subscribe(data => {
      this.wrapperToggled = data;
      this.loading = false;
    }, error => {
      console.log(error);
    });
    this.getClases();
    //this.getClasesbyId();
    if(this.isAlumno)
      this.getClasesbyIdAlumno();
    else if(this.isMaestro)
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
  //Cierra o abre slide derecho
  toggleMenu() {
    this.wrapperToggled = !this.wrapperToggled;
    //Actualizar servicio share con valor seleccionado
    this.share.changeWrapperToggled(this.wrapperToggled);
  }
  getClases() {
    // Parametros a enviar
    let body = {};

    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.get("/api/getClases").subscribe(res => {
        //Informacion del resultado de la consulta
        this.materiasHorarios[0] = res.data[0];
        this.materiasHorarios[1] = res.data[1];
      }, error => {
        console.log(error);
      });
    }, 100);
  }
  //OBTIENE CLASES POR CLAVE DE MATERIA
  getClasesbyId() {
    // Parametros a enviar
    let body = {
      idUsuario: this.currentUser.idUsuario
    };

    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/getClasesById", body).subscribe(res => {
        //Informacion del resultado de la consulta
        console.log(res + "GetClasesbyID");

      }, error => {
        console.log(error);
      });
    }, 100);
  }
  getClasesbyIdAlumno() {
    // Parametros a enviar
    let body = {
      idUsuario: this.currentUser.idUsuario
    };
    this.http.post("/api/getClasesByIdAlumno", body).subscribe(res => {
      //Informacion del resultado de la consulta
      this.materiasHorariosAlumno[0] = res.data[0];
      this.materiasHorariosAlumno[1] = res.data[1];

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
