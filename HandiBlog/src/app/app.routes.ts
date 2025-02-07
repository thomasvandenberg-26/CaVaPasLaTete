import { Routes } from '@angular/router';
import { PageInscriptionComponent} from './Views/page-inscription/page-inscription.component';
import {PageProfilComponent} from './Views/page-profil/page-profil.component';



export const routes: Routes = [
  {path :'signup', component: PageInscriptionComponent},
  {path :'profile', component: PageProfilComponent},
];
