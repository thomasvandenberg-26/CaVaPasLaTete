import { Routes } from '@angular/router';
import { PageInscriptionComponent} from './Views/page-inscription/page-inscription.component';
import {PageConnexionComponent} from './Views/page-connexion/page-connexion.component';



export const routes: Routes = [
  {path :'signup', component: PageInscriptionComponent},
  {path :'login', component: PageConnexionComponent},
];
