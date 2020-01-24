import { NgModule } from '@angular/core/';
import { Routes, RouterModule } from '@angular/router';

import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { ImportComponent } from './pictures/import/import.component';


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
    path: 'pictures/import',
    component: ImportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
