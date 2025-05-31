import { Routes } from '@angular/router';
import { PageInscriptionComponent} from './Views/page-inscription/page-inscription.component';
import {PageConnexionComponent} from './Views/page-connexion/page-connexion.component';
import {PageCreationProfilComponent} from './Views/page-creation-profil/page-creation-profil.component';



export const routes: Routes = [
  {path :'inscription', component: PageInscriptionComponent},
  {path :'connexion', component: PageConnexionComponent},
  {path :'creationProfil/user', component: PageCreationProfilComponent}
];
