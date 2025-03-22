import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {PageInscriptionComponent} from '../page-inscription/page-inscription.component';
import {Routes} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../Services/auth.service';



@Component({
  selector: 'app-page-connexion',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './page-connexion.component.html',
  styleUrl: './page-connexion.component.css'
})
export class PageConnexionComponent {
   formGroup = new FormGroup({
     email : new FormControl('' , {nonNullable: true}),
     password: new FormControl('' , {nonNullable: true}),
  })
  errorMessage = '';
  loginValid: boolean = true;
  constructor(public authService: AuthService, private router: Router) {
  }

  onLogin() {
    this.authService.login(this.formGroup.controls.email.value, this.formGroup.controls.password.value).subscribe((isAuthenticated) => {
      if(isAuthenticated) {
        localStorage.setItem('isAuthenticated','true');
        console.log("Connecté !")
      } else{
        this.errorMessage = 'Email or password is incorrect.';
      }
    },
      () => {
      this.errorMessage = 'Erreur lors de la connexion';
      }
      );


  }
}
