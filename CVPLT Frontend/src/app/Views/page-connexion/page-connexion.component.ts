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
   connectedUser? : User | undefined;
   formGroup = new FormGroup({
     email : new FormControl('' , {nonNullable: true}),
     password: new FormControl('' , {nonNullable: true}),
  });
  errorMessage = '';
  loginValid: boolean = true;
  constructor(public authService: AuthService, private router: Router) {

  }

  onLogin() {
    const email = this.formGroup.controls.email.value;
    const password = this.formGroup.controls.password.value;
    console.log(email);
    this.authService.login(email, password).pipe().subscribe(
      {
        next: (response) => {
          if(response && response.id) {
            this.connectedUser = response;
            localStorage.setItem("userId", this.connectedUser.id.toString())

            this.router.navigate(['creationProfil/user/']);

          }

          else{

          }
        },
        error: error => {
          this.errorMessage = "Email ou mot de passe incorrect";
        }
      }
    )}


}
