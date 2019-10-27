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
  wrapperToggled: boolean = true;
  today= new Date();
  value: Date;
  eventsSchedule: any;
  optionsSchedule: any;
  eventsCalender: any;
  optionsCalender: any;
  eventsScheduleOtro: any;
  tasks: SelectItem[];
  selectedTask: string;

  alertaData: any[]=[];
  alertCols: any[]=[];
  alertSelectedCols: any []=[];

  constructor(private share: ShareService,private authenticationService: AuthenticationService) {
    this.eventsScheduleOtro = [];
    this.currentUser = this.authenticationService.currentUserValue;
    this.alertaData = [
      {'MANUFACTURING_NUMBER':'IPRB0JW',
      'WORK_UNIT':  '3BDQYKMN',
      'PRODUCT_LINE': 'CSCAPP01',
      'OPERATION': 'R500',
      'STATUS': '4 RWK',
      'OPERATION_STATUS': 'S',
      'MACHINE_TIPE': '3841',
      'MACHINE_MODEL': 'G4B',
      'ORDER_STATUS': '9',
      'DATE_RECEIVED_MFGN': '2019-09-30',
      'CURRENT_DATE_': '2019-10-22',
      'CURRENT_TIME_': '11:59:30',
      'COMENTARIOS': 'TIEMPO EXCEDIDO'},
      {'MANUFACTURING_NUMBER':'IPRB265',
      'WORK_UNIT':  '3BDQZF6J',
      'PRODUCT_LINE': 'CSCAPP02',
      'OPERATION': 'T600',
      'STATUS': '2 TEST',
      'OPERATION_STATUS': 'A',
      'MACHINE_TIPE': '4412',
      'MACHINE_MODEL': 'Q3B',
      'ORDER_STATUS': '7',
      'DATE_RECEIVED_MFGN': '2019-10-21',
      'CURRENT_DATE_': '2019-10-22',
      'CURRENT_TIME_': '13:12:29',
      'COMENTARIOS': 'TIEMPO EXCEDIDO'}

  ];
    this.alertCols = [
      {field: 'MANUFACTURING_NUMBER', header: 'MANUFACTURING_NUMBER'},
      {field: 'WORK_UNIT', header: 'WORK_UNIT'},
      {field: 'PRODUCT_LINE', header: 'PRODUCT_LINE'},
      {field: 'OPERATION', header: 'OPERATION'},
      {field: 'STATUS', header: 'STATUS'},
      {field: 'OPERATION_STATUS', header: 'OPERATION_STATUS'},
      {field: 'MACHINE_TIPE', header: 'MACHINE_TIPE'},
      {field: 'MACHINE_MODEL', header: 'MACHINE_MODEL'},
      {field: 'ORDER_STATUS', header: 'ORDER_STATUS'},
      {field: 'DATE_RECEIVED_MFGN', header: 'DATE_RECEIVED_MFGN'},
      {field: 'CURRENT_DATE_', header: 'CURRENT_DATE_'},
      {field: 'CURRENT_TIME_', header: 'CURRENT_TIME_'},
      {field: 'COMENTARIOS', header: 'COMENTARIOS'}
  ];
    this.alertSelectedCols = this.alertCols;
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

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.alertaData);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "reporteTodasLasAlertas");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

}
