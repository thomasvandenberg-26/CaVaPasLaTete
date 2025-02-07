import { Component } from '@angular/core';
import {ProfilComponent} from '../../Component/profil/profil.component';

@Component({
  selector: 'app-page-profil',
  imports: [
    ProfilComponent
  ],
  templateUrl: './page-profil.component.html',
})
export class PageProfilComponent {

  profils = [1,2,3];
}
