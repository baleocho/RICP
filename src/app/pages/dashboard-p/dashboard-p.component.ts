import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-dashboard-p',
  templateUrl: './dashboard-p.component.html',
  styleUrls: ['./dashboard-p.component.scss']
})
export class DashboardPComponent implements OnInit {
  //VARIABLES PARA TABLA DE USUARIOS
  usersVisible: boolean = false;
  usersData: any[] = [];
  usersCols: any[] = [];
  usersUser: any = {};
  usersSelectedColumns: any[] = [];
  usersDisplayDialog: boolean;
  usersNewUser: boolean;
  usersSelectedUser: any;

  //VARIABLES PARA TABLA DE MATERIAS
  subjectsVisible: boolean = false;
  subjectsData: any[] = [];
  subjectsCols: any[] = [];
  subjectsSubject: any = {};
  subjectsSelectedColumns: any[] = [];
  subjectsDisplayDialog: boolean;
  subjectsNewSubject: boolean;
  subjectsSelectedSubject: any;

  //VARIABLES PARA REPORTE PROMEDIO MATERIA
  promedioMateriaVisible: boolean = false;
  promedioMateriaData: any;
  prmedioEntregasData: any;
  promedioEntregasVisible: boolean = false;

  //Variables para graficas principales
  dataLin: any;
  dataBarPromedio: any;
  dataPie: any;
  generalOptions: any;

  //Variables para reportes totales
  clases: any;
  maestros: any;
  alumnos: any;
  
  //Variables para promedio entregas
  cantidad: any;
  tarde: any;
  tiempo: any;

  constructor(private http: HttpService) {
    this.usersUser = {
      idUsuario: 0,
      matricula: "",
      nombre: "",
      fechaNacimiento: "",
      correo: "",
      telefono: "",
      descripcion: "",
      contrasena: "",
      fotoUrl: "",
      tipo: "",
      fechaCreacion: "",
      fechaModificacion: ""
    };
    this.subjectsSubject = {
      idClase: 0,
      idUsuario: 0,
      claveClase: "",
      nombreClase: "",
      aula: "",
      descripcion: "",
      contrasena: "",
      fechaCreacion: "",
      fechaModificacion: ""
    };
    //Opciones generales para graficas principales
    this.generalOptions = {
      title: false,
      display: false,
      legend: true
    };

    this.dataLin = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    }

  }

  ngOnInit() {
    this.getUsers();
    this.getSubjects();
    this.getPromedioReporte();
    this.getTotales();
    this.getPromedios();
  }
  selectMenu(option: string) {
    switch (option) {
      case 'materias':
        this.usersVisible = false;
        this.subjectsVisible = true;
        this.promedioMateriaVisible = false;
        this.promedioEntregasVisible = false;
        break;
      case 'usuarios':
        this.usersVisible = true;
        this.subjectsVisible = false;
        this.promedioMateriaVisible = false;
        this.promedioEntregasVisible = false;
        break;
      case 'promedioMateria':
        this.usersVisible = false;
        this.subjectsVisible = false;
        this.promedioMateriaVisible = true;
        this.promedioEntregasVisible = false;
        break;
      case 'promedioEntregas':
        this.usersVisible = false;
        this.subjectsVisible = false;
        this.promedioMateriaVisible = false;
        this.promedioEntregasVisible = true;
        break;
        default:
        break;
    }
  }
  //************ USER MENU Y FUNCIONES*/
  getUsers() {
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.get("/api/getUsuarios").subscribe(res => {
        //Informacion del resultado de la consulta
        for (var i = 0; 0 >= i; i++) {
          var items = res.data[i];
          var keys = Object.keys(items);
          for (var j = 0, k = keys.length; j < k; j++) {
            this.usersCols.push({ field: keys[j], header: keys[j] });
          }
        }
        this.usersData = res.data;
        this.usersSelectedColumns = this.usersCols;
      }, error => {
        console.log(error);
      });
    }, 100);
  }
  //insert user
  setUser(usersUser) {
    let body = usersUser;
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/setUsuario", body).subscribe(res => {
        //Informacion del resultado de la consulta
        alert("Usuario Guardado");
        location.reload();
      }, error => {
        console.log(error);
      });
    }, 100);
  }
  //update user
  putUser(usersUser) {
    let body = usersUser;
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/putUsuario", body).subscribe(res => {
        //Informacion del resultado de la consulta
        alert("Usuario Modificado");
        location.reload();
      }, error => {
        console.log(error);
      });
    }, 100);
  }
  deleteUser(idUsuario) {
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.postDel("/api/deleteUsuario", idUsuario).subscribe(res => {
        //Informacion del resultado de la consulta
        console.log(res);
      }, error => {
        console.log(error);
      });
    }, 100);

  }
  showUsersDialogToAdd() {
    this.usersNewUser = true;
    this.usersUser = {
      idUsuario: 0,
      matricula: "",
      nombre: "",
      fechaNacimiento: "",
      correo: "",
      telefono: "",
      descripcion: "",
      contrasena: "",
      fotoUrl: "",
      tipo: "",
      fechaCreacion: "",
      fechaModificacion: ""
    }
    this.usersDisplayDialog = true;
  }
  saveUsers() {
    let users = [...this.usersData];
    if (this.usersNewUser) {//NEW USER
      users.push(this.usersUser);
      this.setUser(this.usersUser);
    }
    else {//UPDATE USER
      this.putUser(this.usersUser);
      users[this.usersData.indexOf(this.usersSelectedUser)] = this.usersUser;
    }
    this.usersData = users;
    this.usersUser = null;
    this.usersDisplayDialog = false;
  }
  deleteUsers() {
    let index = this.usersData.indexOf(this.usersSelectedUser);
    this.deleteUser(this.usersSelectedUser.idUsuario);
    this.usersData = this.usersData.filter((val, i) => i != index);
    this.usersUser = null;
    this.usersDisplayDialog = false;

  }
  onRowSelectUsers(event) {
    this.usersNewUser = false;
    this.usersUser = this.cloneUsers(event.data);
    this.usersUser.fechaNacimiento = this.usersUser.fechaNacimiento.slice(0, 10);
    this.usersDisplayDialog = true;

  }

  cloneUsers(u: any): any {
    let user = {};
    for (let prop in u) {
      user[prop] = u[prop];
    }
    return user;
  }
  //************ MATERIAS MENU Y FUNCIONES*/
  getSubjects() {
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.get("/api/getAllClases").subscribe(res => {
        //Informacion del resultado de la consulta
        for (var i = 0; 0 >= i; i++) {
          var items = res.data[i];
          var keys = Object.keys(items);
          for (var j = 0, k = keys.length; j < k; j++) {
            this.subjectsCols.push({ field: keys[j], header: keys[j] });
          }
        }
        this.subjectsData = res.data;
        this.subjectsSelectedColumns = this.subjectsCols;
      }, error => {
        console.log(error);
      });
    }, 100);
  }
  setSubject(subjectsSubject) {
    let body = subjectsSubject;
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/setClase", body).subscribe(res => {
        //Informacion del resultado de la consulta
        alert("Materia Guardada");
        location.reload();
      }, error => {
        console.log(error);
      });
    }, 100);
  }
  showSubjectsDialogToAdd() {
    this.subjectsNewSubject = true;
    this.subjectsSubject = {
      idClase: 0,
      idUsuario: 0,
      claveClase: "",
      nombreClase: "",
      aula: "",
      descripcion: "",
      contrasena: "",
      fechaCreacion: "",
      fechaModificacion: ""
    }
    this.subjectsDisplayDialog = true;
  }
  saveSubject() {
    let subjects = [...this.subjectsData];
    if (this.subjectsNewSubject) {//NEW USER
      subjects.push(this.subjectsSubject);
      this.setSubject(this.subjectsSubject);

    }
    else {//UPDATE USER
      subjects[this.subjectsData.indexOf(this.subjectsSelectedSubject)] = this.subjectsSubject;
    }
    this.subjectsData = subjects;
    this.subjectsSubject = null;
    this.subjectsDisplayDialog = false;
  }
  onRowSelectSubjects(event) {
    this.subjectsNewSubject = false;
    this.subjectsSubject = this.cloneSubjects(event.data);
    this.subjectsDisplayDialog = true;

  }

  cloneSubjects(s: any): any {
    let subject = {};
    for (let prop in s) {
      subject[prop] = s[prop];
    }
    return subject;
  }

  /******REPORTES ********/
  getPromedioReporte() {
    let body = {};

    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/getReportePromedio", body).subscribe(res => {
        let labels: any[] = [];
        let data: any[] = [];
        //OBTIENE DATOS Y LES DA FORMATO PARA INSERTAR EN GRAFICA
        for (let i = 0; i < res.data.length; i++) {
          labels.push(res.data[i].nombreClase);
          data.push(res.data[i].promedio);
        }
        this.promedioMateriaData = res.data;

        this.dataBarPromedio = {
          labels: labels,
          datasets: [
            {
              label: 'Promedio de calificaciones',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: data
            }
          ]
        }

      });
    }, 100);
  }
  //Consulta de totales
  getTotales() {
    let body = {};
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/getDatosTotales", body).subscribe(res => {
        //Informacion del resultado de la consulta
        this.alumnos = res.data[0].alumnos;
        this.clases = res.data[0].clases;
        this.maestros = res.data[0].maestros;
      }, error => {
        console.log(error);
      });
    }, 100);
  }

  //Consulta de promedios
  getPromedios(){
    let body = {};
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/getPromedioEntregas", body).subscribe(res => {
        //Informacion del resultado de la consulta
        this.cantidad = res.data[0].cantidad;
        this.tarde = res.data[0].promedioTARDE.slice(0,2);
        this.tiempo = res.data[0].promedioTIEMPO.slice(0,2);
        console.log(res.data);

        this.dataPie = {
          labels: ['A tiempo', 'Tarde'],
          datasets: [
            {
              data: [this.tiempo, this.tarde],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ]
            }]
        };
      }, error => {
        console.log(error);
      });
    }, 100);
  }
}
