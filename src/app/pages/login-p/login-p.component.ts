import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { AuthenticationService } from '../../auth-files/_services';

@Component({
  selector: 'app-login-p',
  templateUrl: './login-p.component.html',
  styleUrls: ['./login-p.component.scss']
})
export class LoginPComponent implements OnInit {
  //Reescalar imagen
  innerHeight: any = "1400px";

  loginForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  toggleRegistro: boolean = false;
  userReg: any = {};
  success: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.userReg = {
      idUsuario: 0,
      matricula: "",
      nombre: "",
      fechaNacimiento: "",
      correo: "",
      telefono: "",
      descripcion: "Soy UDG",
      contrasena: "",
      fotoUrl: "",
      tipo: "Alumno",
      fechaCreacion: "",
      fechaModificacion: ""
    };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      usernameReg: ['', Validators.required],
      passwordReg: ['', Validators.required],
      passwordRegConfirm: ['', Validators.required],
      matriculaReg: ['', Validators.required],
      emailReg: ['', Validators.required],
      phoneReg: ['', Validators.required],
      dateReg: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    //Tomar tamaño de pantalla para imagen
    this.innerHeight = window.innerHeight;
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  get r() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  onSubmitRegister() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    let currentInsertUser = this.userReg;
    currentInsertUser.nombre = this.r.usernameReg.value;
    currentInsertUser.matricula = this.r.matriculaReg.value;
    currentInsertUser.correo = this.r.emailReg.value;
    currentInsertUser.telefono = this.r.phoneReg.value;
    currentInsertUser.fechaNacimiento = this.r.dateReg.value;
    currentInsertUser.contrasena = this.r.passwordReg.value;

    this.setUser(currentInsertUser)
    this.loading = false;
  }

  setUser(usersUser) {
    let body = usersUser;
    setTimeout(() => { // Espera 100 ms para que se cargue correctamente la informacion
      this.http.post("/api/setUsuario",body).subscribe(res => {
        //Informacion del resultado de la consulta
        window.alert("Registro exitoso XD");
        this.toggleRegistro = false;
      }, error => {
        console.log(error);
      });
    }, 100);
  }
  
  //Reescalar imagen cuando la pantalla se modifique
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.innerHeight = window.innerHeight;
  }

}
