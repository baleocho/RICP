import { Component, OnInit, HostListener } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AllDaySplitter from '@fullcalendar/timegrid/AllDaySplitter';
import { SelectItem } from 'primeng/api';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { User,Role } from '../../auth-files/_models';
import { AuthenticationService } from 'src/app/auth-files/_services';

@Component({
  selector: 'app-schedule-p',
  templateUrl: './schedule-p.component.html',
  styleUrls: ['./schedule-p.component.scss']
})
export class SchedulePComponent implements OnInit {
  wrapperToggled: boolean = false;
  cars: SelectItem[];
  selectedCar: string;
  H: any;
  today = new Date();
  value: Date;
  eventsSchedule: any;
  eventsScheduleOtro: any;
  optionsSchedule: any;
  eventsCalender: any;
  optionsCalender: any;
  tasks: SelectItem[];
  selectedTask: string;
  //User information
  currentUser: User;
  constructor(private share: ShareService,private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.cars = [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Ford', value: 'Ford' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' }
    ];
    this.tasks = [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Ford', value: 'Ford' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' }
    ];
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
    //OBTENER VARIABLES GLOBALES COMPARTIDAS DEL SERVICIO SHARE DESDE COMPONENTE SEARCH


    this.share.currentWrapperToggled.subscribe(data => {
      this.wrapperToggled = data;
    }, error => {
      console.log(error);

    });
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
}
