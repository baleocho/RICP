import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import { HttpService } from 'src/app/services/http.service';
import { AuthenticationService } from '../../auth-files/_services';
import { User,Role } from '../../auth-files/_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-c',
  templateUrl: './side-bar-c.component.html',
  styleUrls: ['./side-bar-c.component.scss']
})
export class SideBarCComponent implements OnInit {
  currentUser: User;
  sideMaterias: any;
  sideBarToggled: boolean = false;
  constructor(private share: ShareService, private http: HttpService, private authenticationService: AuthenticationService, private router: Router) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    //OBTENER VARIABLES GLOBALES COMPARTIDAS DEL SERVICIO SHARE DESDE COMPONENTE SIDE BAR
    this.share.currentSideBarToggled.subscribe(data => {
      if (data) {
        this.sideBarToggled = data;
      }
    }, error => {
      console.log(error);
    });
    this.sideBarToggled = false;
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.tipo === Role.Administrador;
  }
  get isMaestro(){
    return this.currentUser && this.currentUser.tipo === Role.Maestro;
  }
  get isAlumno(){
    return this.currentUser && this.currentUser.tipo === Role.Alumno;
  }
  getMenu() {
    let body = {
      idUsuario: this.currentUser.idUsuario
    }
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/getSideMaterias", body).subscribe(res => {
        //Informacion del resultado de la consulta
        this.sideMaterias = res.data;
      }, error => {
        console.log(error);
      });
    }, 100);
  }
  getMenuMaestro() {
    let body = {
      idUsuario: this.currentUser.idUsuario
    }
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/getSideMateriasMaestro", body).subscribe(res => {
        //Informacion del resultado de la consulta
        this.sideMaterias = res.data;
      }, error => {
        console.log(error);
      });
    }, 100);
  }
}
