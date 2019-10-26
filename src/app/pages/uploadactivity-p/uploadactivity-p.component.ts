import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import { first } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';

import { User } from '../../auth-files/_models';
import { UserService, AuthenticationService } from '../../auth-files/_services';


@Component({
  selector: 'app-uploadactivity-p',
  templateUrl: './uploadactivity-p.component.html',
  styleUrls: ['./uploadactivity-p.component.scss']
})
export class UploadactivityPComponent implements OnInit {

  wrapperToggled: boolean = false;
  constructor(private share: ShareService, private userService: UserService, private authenticationService: AuthenticationService, private http: HttpService) { }

  ngOnInit() {
  }


  toggleMenu() {
    this.wrapperToggled = !this.wrapperToggled;
    //Actualizar servicio share con valor seleccionado
    this.share.changeWrapperToggled(this.wrapperToggled);
    console.log(this.wrapperToggled);
  }
  

}
