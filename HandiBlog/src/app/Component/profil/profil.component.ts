import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {DatePickerComponent} from '../date-picker/date-picker.component';

@Component({
  selector: 'app-profil',
  imports: [
    NgOptimizedImage,
    DatePickerComponent
  ],
  templateUrl: './profil.component.html',
})
export class ProfilComponent {
  @Input() profil!: any;

  get prenom() {
    return this.profil ? this.profil.firstName: null;
  }
  get nom() {
    return this.profil ? this.profil.lastName : null;
  }
  get specialite() {
    return this.profil ? this.profil.speciality : null;
  }
  get description() { return this.profil ? this.profil.description : null; }
}
