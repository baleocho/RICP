import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import { AuthenticationService } from './../../auth-files/_services';
import { User, Role } from './../../auth-files/_models';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-profile-p',
  templateUrl: './profile-p.component.html',
  styleUrls: ['./profile-p.component.scss']
})
export class ProfilePComponent implements OnInit {
  currentUser: User;
  wrapperToggled: boolean = false;
  showAlert:boolean = false;

  constructor(
    private share: ShareService,
    private authenticationService: AuthenticationService,
    private http: HttpService )
  { 
    this.currentUser = this.authenticationService.currentUserValue;
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.tipo === Role.Administrador;
  }
  ngOnInit() {
    //OBTENER VARIABLES GLOBALES COMPARTIDAS DEL SERVICIO SHARE DESDE COMPONENTE SEARCH
    this.share.currentWrapperToggled.subscribe(data => {
      this.wrapperToggled = data;
    }, error => {
      console.log(error);
    });
  }
  toggleMenu() {
    this.wrapperToggled = !this.wrapperToggled;
    //Actualizar servicio share con valor seleccionado
    this.share.changeWrapperToggled(this.wrapperToggled);
  }
}
