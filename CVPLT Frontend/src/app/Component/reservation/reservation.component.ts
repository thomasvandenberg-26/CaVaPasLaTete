import { Component } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl : 'reservation.component.html'
})
export class ReservationComponent {
  motif: string = '';
  horaires: string[] = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  selectedHoraire: string | null = null;

  constructor(private dialog: MatDialog) {}

  selectHoraire(horaire: string) {
    this.selectedHoraire = horaire;
  }

  isValid(): boolean {
    return this.motif.trim().length > 0 && this.selectedHoraire !== null;
  }

  fermer() {
    this.dialog.closeAll();
  }

  confirmer() {
    if (this.isValid()) {
      // Ici vous pouvez ajouter la logique pour sauvegarder le rendez-vous
      console.log('Réservation confirmée:', {
        motif: this.motif,
        horaire: this.selectedHoraire
      });
      this.fermer();
    }
  }
}
