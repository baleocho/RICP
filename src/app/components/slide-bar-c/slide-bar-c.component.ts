import { Component, OnInit, HostListener } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AllDaySplitter from '@fullcalendar/timegrid/AllDaySplitter';
import { HttpService } from '../../services/http.service';
import { User, Role } from '../../auth-files/_models';
import { Subscription } from 'rxjs';
import { UserService, AuthenticationService } from '../../auth-files/_services';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-slide-bar-c',
  templateUrl: './slide-bar-c.component.html',
  styleUrls: ['./slide-bar-c.component.scss']
})
export class SlideBarCComponent implements OnInit {
  data: any;
  //User information
  currentUser: User;
  actividadesUsuario: any[] = [];
  persona: any;


  H: any;
  wrapperToggled: boolean = false;
  today = new Date();
  value: Date;
  eventsSchedule: any;
  eventsScheduleOtro: any;
  optionsSchedule: any;
  eventsCalender: any;
  optionsCalender: any;
  tasks: SelectItem[];
  selectedTask: string;
  constructor(private share: ShareService, private userService: UserService, private authenticationService: AuthenticationService, private http: HttpService, private router: Router) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.H = window.innerHeight;
  }
  @HostListener('window:resize', ['$event']) onresize(event) {
    this.H = window.innerHeight;
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
  ngOnInit() {
    this.eventsCalender  = [
      {
        "title": "Apreciación del arte",
        "start": "2019-08-23",
        "rendering": 'background',
        "end": "2019-08-23"
      },
      {
        "title": "Investigación artistas siglo XX",
        "start": "2019-08-09",
        "rendering": 'background',
        "end": "2019-08-09"
      }
      
    ];
    this.eventsSchedule = [
      {
        "title": "Apreciación del arte",
        "start": "2019-08-19T16:00:00",
        "end": "2019-08-19T18:00:00"
      },
      {
        "title": "Apreciación del arte",
        "start": "2019-08-22T16:00:00",
        "end": "2019-08-22T18:00:00"
      },
      {
        "title": "Comprensión de la ciencia",
        "start": "2019-08-21T18:00:00",
        "end": "2019-08-21T20:00:00"
      },
      {
        "title": "Comprensión de la ciencia",
        "start": "2019-08-22T18:00:00",
        "end": "2019-08-22T19:00:00"
      },
      {
        "title": "Comprensión de la ciencia",
        "start": "2019-08-23T19:00:00",
        "end": "2019-08-23T20:00:00"
      },
      {
        "title": "Descripción y comunicación",
        "start": "2019-08-20T13:00:00",
        "end": "2019-08-20T15:00:00"
      },
      {
        "title": "Descripción y comunicación",
        "start": "2019-08-23T14:00:00",
        "end": "2019-08-23T16:00:00"
      }
    ];
    this.eventsScheduleOtro = [];
    this.getActivitisByUser();

    this.optionsSchedule = {
      plugins: [timeGridPlugin, interactionPlugin],
      defaultView: 'timeGridWeek',
      defaultDate: this.today,
      locale: 'es',
      weekends: true,
      header: false,
      allDaySlot: false,
      // like 'Mon 9/7', for week views
      weekday: false, month: false, day: false

    };
    this.optionsCalender = {
      plugins: [dayGridPlugin, interactionPlugin],
      defaultDate: this.today,
      locale: 'es',
      weekends: true,
      allDaySlot: false,
      header: false
    };


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

  taskClick(idTask: any) {
    alert('Task con ID: ' + idTask);
  }


  getActivitisByUser() {
    // Parametros a enviar
    let body = {
      idUsuario: this.currentUser.idUsuario
    };
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/getactivitysById", body).subscribe(res => {
        //Informacion del resultado de la consulta
        this.actividadesUsuario = res.data;
      }, error => {
        console.log(error);
      });
    }, 100);
  }

}
