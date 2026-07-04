import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {User} from '../../Models/User';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {ApiService} from '../../Services/api.service';
import {NgIf} from '@angular/common';
import {boutonValiderFormulaire} from '../../Component/boutonValiderFormulaire/boutonValiderFormulaire';


@Component({
  selector: 'app-page-connexion',
  imports: [
    boutonValiderFormulaire,
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
     email: new FormControl('',[Validators.required],),
     password: new FormControl('' ,[Validators.required, Validators.minLength(8)] ),
  });
  errorMessage = '';
  constructor(public authService: ApiService, private router: Router) {











  }

  onLogin() {
    const email = this.formGroup.controls.email.value;
    const password = this.formGroup.controls.password.value;
    console.log(email);
    if (email != null && password != null) {
      this.authService.login(email, password).subscribe(
        {
          next: (response) => {
            if (response && response.id) {
              this.connectedUser = response;
              this.router.navigate(['creationProfil/user/']);

            } else {

            }
          },
          error: error => {
            this.errorMessage = "Email ou mot de passe incorrect";
          }
        }
      )
    }
  }
    isInvalidAndTouchedOrDirty(formControl: FormControl)
    {
      return formControl.invalid && (formControl.dirty || formControl.touched)
    }


}
