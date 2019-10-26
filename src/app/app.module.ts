//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { DropdownModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/editor';
import { MultiSelectModule } from 'primeng/primeng';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ListboxModule } from 'primeng/listbox';
import { SidebarModule } from 'primeng/sidebar';
import {ChartModule} from 'primeng/chart';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

// used to create fake backend
//import { fakeBackendProvider } from './auth-files/_helpers';
//Auth Process
import { JwtInterceptor, ErrorInterceptor } from './auth-files/_helpers';

//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePComponent } from './pages/home-p/home-p.component';
import { LoginPComponent } from './pages/login-p/login-p.component';
import { NavBarCComponent } from './components/nav-bar-c/nav-bar-c.component';
import { SlideBarCComponent } from './components/slide-bar-c/slide-bar-c.component';
import { SchedulePComponent } from './pages/schedule-p/schedule-p.component';
import { SubjectsPComponent } from './pages/subjects-p/subjects-p.component';
import { ProfilePComponent } from './pages/profile-p/profile-p.component';
import { SideBarCComponent } from './components/side-bar-c/side-bar-c.component';
import { DashboardPComponent } from './pages/dashboard-p/dashboard-p.component';
import { SubjectPComponent } from './pages/subject-p/subject-p.component';
import { AgendaPComponent } from './pages/agenda-p/agenda-p.component';
import { CalenderPComponent } from './pages/calender-p/calender-p.component';
import { UploadactivityPComponent } from './pages/uploadactivity-p/uploadactivity-p.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePComponent,
    LoginPComponent,
    NavBarCComponent,
    SlideBarCComponent,
    SchedulePComponent,
    SubjectsPComponent,
    ProfilePComponent,
    SideBarCComponent,
    DashboardPComponent,
    SubjectPComponent,
    DashboardPComponent,
    AgendaPComponent,
    CalenderPComponent,
    UploadactivityPComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    CalendarModule,
    FullCalendarModule,
    DropdownModule,
    ReactiveFormsModule,
    EditorModule,
    MultiSelectModule,
    ScrollPanelModule,
    HttpClientModule,
    ListboxModule,
    SidebarModule,
    ChartModule,
    ProgressSpinnerModule,
    TableModule,
    DialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
