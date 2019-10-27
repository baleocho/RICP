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
  today = new Date();
  value: Date;
  selectedTask: string;
  wrapperToggled: boolean = false;
  data: any;
  personaSubs: Subscription = null;
  //User information
  currentUser: User;
  colsAlmacen: any[] = [];
  rowsAlmacen: any[] = [];
  persona: any;
  almacenSelectedColumns: any[] = [];


  constructor(private share: ShareService, private userService: UserService, private authenticationService: AuthenticationService, private http: HttpService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    //OBTENER VARIABLES GLOBALES COMPARTIDAS DEL SERVICIO SHARE DESDE COMPONENTE SEARCH
    this.share.currentWrapperToggled.subscribe(data => {
      this.wrapperToggled = data;
    }, error => {
      console.log(error);
    });

    this.getAlmacen();
  }


  taskClick(idTask: any) {
    alert('Task con ID: ' + idTask);
  }
  getAlmacen() {
    // Parametros a enviar
    let body = {
      idUsuario: this.currentUser.idUsuario
    };

    // Validar el obserbable si no esta null
    if (this.personaSubs) {
      this.personaSubs.unsubscribe(); // En caso de no ser null desubscribirlo para evitar llamadas pendientes
      this.personaSubs = null; // Igualarlo a null para reiniciar la variable
    }

    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.personaSubs = this.http.get("/api/getAlmacen").subscribe(res => {
        //Informacion del resultado de la consulta
        for (var i = 0; 0 >= i; i++) {
          var cols = res.data.columns;
          for (var j = 0, k = cols.length; j < k; j++) {
            this.colsAlmacen.push({ field: cols[j], header: cols[j] });
          }
        }

        for (var i = 0; i < res.data.rows.length; i++) {
          this.rowsAlmacen.push(
            {
              "SAP_ORDER": res.data.rows[i][0],
              "MANUFACTURING_NUMBER": res.data.rows[i][1],
              "WORK_UNIT": res.data.rows[i][2],
              "PRODUCT_LINE": res.data.rows[i][3],
              "OPERATION": res.data.rows[i][4],
              "STATUS": res.data.rows[i][5],
              "OPERATION_STATUS": res.data.rows[i][6],
              "MACHINE_TIPE": res.data.rows[i][7],
              "MACHINE_MODEL": res.data.rows[i][8],
              "ORDER_STATUS": res.data.rows[i][9],
              "DATE_RECEIVED_MFGN": res.data.rows[i][10],
              "CURRENT_DATE_": res.data.rows[i][11],
              "CURRENT_TIME_": res.data.rows[i][12]
            }
          );
        }
        this.almacenSelectedColumns = this.colsAlmacen;
        console.log(this.colsAlmacen);
        console.log(this.rowsAlmacen);
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

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.rowsAlmacen);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "reporteTodaslasOrdenes");
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
