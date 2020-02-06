import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { ConnexionComponent } from './authentification/connexion/connexion.component';
import { LogoutComponent } from './authentification/logout/logout.component';
import { EmployeeComponent } from './authentification/model/job/employee/employee.component';
import { AddEmployeeComponent } from './authentification/model/job/add-employee/add-employee.component';
import { UserListComponent } from './authentification/model/user/user-list/user-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpInterceptorService } from './authentification/service/http-interceptor.service';
import { UserService } from './authentification/service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    InscriptionComponent,
    ConnexionComponent,
    LogoutComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService,
    {  
      provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
