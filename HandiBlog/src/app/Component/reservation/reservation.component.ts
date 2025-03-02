import {Component} from '@angular/core';
import {MatDialog, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';



@Component({
  selector: 'app-reservation',

  templateUrl: './reservation.component.html',
  standalone: true,

  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButton,
  ]
})

export class ReservationComponent {
 constructor(private dialog: MatDialog) {
 }

 fermer(){
   this.dialog.closeAll()
 }
}
