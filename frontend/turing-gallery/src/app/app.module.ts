import { BrowserModule } from '@angular/platform-browser/';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestApiComponent } from './test-api/test-api.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ImportComponent } from './pictures/import/import.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InscriptionComponent } from './inscription/inscription.component';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';

@NgModule({
  declarations: [
    AppComponent,
    TestApiComponent,
    ImportComponent,
    InscriptionComponent,
    HomeComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MDBBootstrapModule.forRoot(),
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
