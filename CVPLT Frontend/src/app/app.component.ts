import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './Views/header/header.component';
import {ApiService} from './Services/api.service';
import {AuthService} from './Services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HandiBlog';


  constructor(public apiService: ApiService, private router: Router) {

     apiService.getUserId("vandenbergthomas@hotmail.com").subscribe({
       next: data => {
         console.log(data);
       },
       error: err => {
         console.log(err);
       },
       complete: () => {
         console.log('User Data Loaded');
       }
     })
  }


}
