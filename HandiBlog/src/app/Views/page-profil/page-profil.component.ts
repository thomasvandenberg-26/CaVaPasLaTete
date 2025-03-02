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

  profils = [
    { id: 1, firstName: "Thomas" , lastName: "VAN DEN BERG" , speciality: "Ergothérapeute", description: "Lorem ipsum dolor sit " },
    { id: 2, firstName: "Alice" , lastName: "Durand", speciality: "Photographe", description: "Lorem ipsum dolor sit " },
    { id: 3, firstName: "Bob", lastName: "Ciobanu",speciality: "Développeur", description: "Lorem ipsum dolor sit " }
  ];


}
