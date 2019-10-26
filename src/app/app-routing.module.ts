import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePComponent } from './pages/home-p/home-p.component';
import { LoginPComponent } from './pages/login-p/login-p.component';
import { SchedulePComponent } from './pages/schedule-p/schedule-p.component';
import { ProfilePComponent } from './pages/profile-p/profile-p.component';
import { SubjectsPComponent } from './pages/subjects-p/subjects-p.component';
import { DashboardPComponent } from './pages/dashboard-p/dashboard-p.component';
import { AgendaPComponent } from './pages/agenda-p/agenda-p.component';
import { CalenderPComponent } from './pages/calender-p/calender-p.component';
import { UploadactivityPComponent } from './pages/uploadactivity-p/uploadactivity-p.component';
import { AuthGuard } from './auth-files/_helpers';
import { Role } from './auth-files/_models';
import { SubjectPComponent } from './pages/subject-p/subject-p.component';

const routes: Routes = [
  
    //data: { roles: [Role.Administrador] }
    //data: { roles: [Role.Maestro] }
    //data: { roles: [Role.Alumno] }
  { path: '', component: HomePComponent, canActivate: [AuthGuard] },
  { path: "home", component: HomePComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginPComponent },
  { path: "ReporteMaquinas", component: SchedulePComponent, canActivate: [AuthGuard] },
  { path: "uploadactivity", component: UploadactivityPComponent },
  { path: "profile", component: ProfilePComponent, canActivate: [AuthGuard] },
  { path: "OrdenesDisponibles", component: SubjectsPComponent, canActivate: [AuthGuard] },
  { path: "subject/:id", component: SubjectPComponent, canActivate: [AuthGuard] },
  { path: "dashboard", component: DashboardPComponent, canActivate: [AuthGuard], data: { roles: [Role.Administrador] } },
  { path: "OrdenesEnPiso", component: AgendaPComponent, canActivate: [AuthGuard] },
  { path: "Alertas", component: CalenderPComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
