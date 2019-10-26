import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';

import { Router } from '@angular/router';

import { AuthenticationService } from './../../auth-files/_services';
import { User, Role } from './../../auth-files/_models';

@Component({
  selector: 'app-nav-bar-c',
  templateUrl: './nav-bar-c.component.html',
  styleUrls: ['./nav-bar-c.component.scss']
})
export class NavBarCComponent implements OnInit {
  currentUser: User;
  sideBarToggled: boolean = false; //For side bar toggle
  wrapperToggled: boolean = false; //For slide bar toggle and content expand


  constructor(
    private share: ShareService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
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
  ngOnInit() {
    //OBTENER VARIABLES GLOBALES COMPARTIDAS DEL SERVICIO SHARE DESDE COMPONENTE SLIDE BAR
    this.share.currentWrapperToggled.subscribe(data => {
      this.wrapperToggled = data;
    }, error => {
      console.log(error);
    });
    //OBTENER VARIABLES GLOBALES COMPARTIDAS DEL SERVICIO SHARE DESDE COMPONENTE SIDE BAR
    this.share.currentSideBarToggled.subscribe(data => {
      if(data)
        this.sideBarToggled = data;
    }, error => {
      console.log(error);
    });
    this.sideBarToggled = false;
  }
  toggleMenu() {
    this.wrapperToggled = !this.wrapperToggled;
    //Actualizar servicio share con valor seleccionado
    this.share.changeWrapperToggled(this.wrapperToggled);
  }
  toggleMenuSideBar() {
    this.sideBarToggled = !this.sideBarToggled;
    //Actualizar servicio share con valor seleccionado
    this.share.changeSideBarToggled(this.sideBarToggled);
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
