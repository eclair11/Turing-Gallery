import { NgModule } from '@angular/core/';
import { Routes, RouterModule } from '@angular/router';

import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { ImportComponent } from './pictures/import/import.component';
import { DisplayComponent } from './pictures/display/display.component';
import { GenerateComponent } from './catalog/generate/generate.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'connexion',
    component: ConnexionComponent
  },
  {
    path: 'catalog/generate',
    component: GenerateComponent
  },
  {
    path: 'pictures/display',
    component: DisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
