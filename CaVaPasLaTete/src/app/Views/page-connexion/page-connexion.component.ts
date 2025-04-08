import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ApiService} from '../../Services/api.service';
import {PageInscriptionComponent} from '../page-inscription/page-inscription.component';
import {Routes} from '@angular/router';
import {User} from '../../Models/User';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../Services/auth.service';
import {NgIf} from '@angular/common';



@Component({
  selector: 'app-page-connexion',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './page-connexion.component.html',
  styleUrl: './page-connexion.component.css'
})
export class PageConnexionComponent {
  user : User;
   formGroup = new FormGroup({
     email : new FormControl('' , {nonNullable: true}),
     password: new FormControl('' , {nonNullable: true}),
  });
  errorMessage = '';
  loginValid: boolean = true;
  constructor(public authService: AuthService, private router: Router) {
    this.user = new User(this.formGroup.controls.email.value,this.formGroup.controls.password.value)
  }

  onLogin() {
    this.authService.login(this.formGroup.controls.email.value, this.formGroup.controls.password.value).subscribe((isAuthenticated) => {
      if(isAuthenticated) {
        localStorage.setItem('isAuthenticated','true');
        this.router.navigate(['/profile/' + this.authService.getUserId(this.user.email.toString())]);

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
