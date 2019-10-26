import { Component, OnInit, HostListener } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import { HttpService } from '../../services/http.service';
import { User } from '../../auth-files/_models';
import { Subscription } from 'rxjs';
import { UserService, AuthenticationService } from '../../auth-files/_services';


@Component({
  selector: 'app-agenda-p',   
  templateUrl: './agenda-p.component.html',
  styleUrls: ['./agenda-p.component.scss']
})
export class AgendaPComponent implements OnInit {
  today= new Date();
  value: Date;
  selectedTask: string;
  wrapperToggled: boolean = false;
  data: any;
personaSubs: Subscription = null;
    //User information
  currentUser: User;
  actividadesUsuario: any[] = [];
  persona: any;


  constructor(private share: ShareService  ,private userService: UserService, private authenticationService: AuthenticationService, private http: HttpService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
//OBTENER VARIABLES GLOBALES COMPARTIDAS DEL SERVICIO SHARE DESDE COMPONENTE SEARCH
    this.share.currentWrapperToggled.subscribe(data => {
      this.wrapperToggled = data;
    }, error => {
      console.log(error);
    });

    this.getActivitisByUser();
  }
  
  
  taskClick(idTask: any) {
    alert('Task con ID: '+idTask);
  }
  getActivitisByUser() {
    // Parametros a enviar
     let body = {
      idUsuario:this.currentUser.idUsuario
    }; 
    
        // Validar el obserbable si no esta null
        if (this.personaSubs) {
          this.personaSubs.unsubscribe(); // En caso de no ser null desubscribirlo para evitar llamadas pendientes
          this.personaSubs = null; // Igualarlo a null para reiniciar la variable
        }

  setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
    this.personaSubs = this.http.post("/api/getactivitysById", body).subscribe(res => {
      //Informacion del resultado de la consulta
      this.actividadesUsuario=res.data;
  }, error => {
      console.log(error);
    });
  }, 100);

   
  }

  toggleMenu() {
    this.wrapperToggled = !this.wrapperToggled;
    //Actualizar servicio share con valor seleccionado
    this.share.changeWrapperToggled(this.wrapperToggled);
  }
  
}
