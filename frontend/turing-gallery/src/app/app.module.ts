import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestApiComponent } from './test-api/test-api.component';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ImportComponent } from './pictures/import/import.component';
import { DisplayComponent } from './pictures/display/display.component';
import { ModelComponent } from './catalog/generate/model/model.component';
import { PicturesComponent } from './catalog/generate/pictures/pictures.component';
import { GenerateComponent } from './catalog/generate/generate.component';

@NgModule({
  declarations: [
    AppComponent,
    TestApiComponent,
    ImportComponent,
    HomeComponent,
    ConnexionComponent,
    DisplayComponent,
    ModelComponent,
    PicturesComponent,
    GenerateComponent,
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
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
