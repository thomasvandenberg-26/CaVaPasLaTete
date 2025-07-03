import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-menu',
  imports: [MatMenuModule, MatButtonModule, MatIconModule],
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon>menu</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item>
        <mat-icon>login</mat-icon>
        <span>Se connecter</span>
      </button>
      <button mat-menu-item>
        <mat-icon>info</mat-icon>
        <span>À propos</span>
      </button>
      <button mat-menu-item>
        <mat-icon>contact_mail</mat-icon>
        <span>Contact</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      button[mat-icon-button] {
        color: #ffffff;
      }

      mat-menu {
        background-color: #065758;
        color: #ffffff;
      }
    `,
  ],
})
export class Menu {

}
