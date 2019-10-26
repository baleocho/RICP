import { Component, OnInit, HostListener } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AllDaySplitter from '@fullcalendar/timegrid/AllDaySplitter';
import { User, Role } from '../../auth-files/_models';
import {SelectItem} from 'primeng/api';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { AuthenticationService } from 'src/app/auth-files/_services';

@Component({
  selector: 'app-calender-p',
  templateUrl: './calender-p.component.html',
  styleUrls: ['./calender-p.component.scss']
})
export class CalenderPComponent implements OnInit {
  cars: SelectItem[];
  selectedCar: string;
    //User information
    currentUser: User;
  H: any;
  wrapperToggled: boolean = false;
  today= new Date();
  value: Date;
  eventsSchedule: any;
  optionsSchedule: any;
  eventsCalender: any;
  optionsCalender: any;
  eventsScheduleOtro: any;
  tasks: SelectItem[];
  selectedTask: string;
  constructor(private share: ShareService,private authenticationService: AuthenticationService) {
    this.eventsScheduleOtro = [];
    this.currentUser = this.authenticationService.currentUserValue;
    this.cars = [
      {label: 'Audi', value: 'Audi'},
      {label: 'BMW', value: 'BMW'},
      {label: 'Fiat', value: 'Fiat'},
      {label: 'Ford', value: 'Ford'},
      {label: 'Honda', value: 'Honda'},
      {label: 'Jaguar', value: 'Jaguar'},
      {label: 'Mercedes', value: 'Mercedes'},
      {label: 'Renault', value: 'Renault'},
      {label: 'VW', value: 'VW'},
      {label: 'Volvo', value: 'Volvo'}
  ];
    this.tasks = [
      {label: 'Audi', value: 'Audi'},
      {label: 'BMW', value: 'BMW'},
      {label: 'Fiat', value: 'Fiat'},
      {label: 'Ford', value: 'Ford'},
      {label: 'Honda', value: 'Honda'},
      {label: 'Jaguar', value: 'Jaguar'},
      {label: 'Mercedes', value: 'Mercedes'},
      {label: 'Renault', value: 'Renault'},
      {label: 'VW', value: 'VW'},
      {label: 'Volvo', value: 'Volvo'}
  ];
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
  @HostListener('window:resize', ['$event']) onresize(event) {
    this.H = window.innerHeight;
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
        header: {
          left: 'prev,next today',
          center: 'title',
          right: false
        },
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
    alert('Task con ID: '+idTask);
  }

}
