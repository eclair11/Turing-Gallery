import { BrowserModule } from '@angular/platform-browser/';
import { NgModule } from '@angular/core/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestApiComponent } from './test-api/test-api.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http/';
import { InscriptionComponent } from './inscription/inscription.component';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';

@NgModule({
  declarations: [
    AppComponent,
    TestApiComponent,
    InscriptionComponent,
    HomeComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
