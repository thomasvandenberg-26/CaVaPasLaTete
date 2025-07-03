import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ReservationComponent} from '../reservation/reservation.component'

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent {

  constructor(private dialog: MatDialog) {
  }
  @Input() selectedDate: Date = new Date();
  @Output() dateSelected = new EventEmitter<Date>();
  @Input() isVisible = false;

  currentDate = new Date();
  weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
  calendarDays: Array<{ date: Date; inMonth: boolean }> = [];

  ngOnInit() {
    this.generateCalendarDays();
  }

  generateCalendarDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Premier jour du mois
    const firstDayOfMonth = new Date(year, month, 1);
    // Dernier jour du mois
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Jour de la semaine du premier jour (0 = dimanche, 1 = lundi, etc.)
    let firstWeekday = firstDayOfMonth.getDay();
    // Ajuster pour commencer par lundi (1) au lieu de dimanche (0)
    firstWeekday = firstWeekday === 0 ? 6 : firstWeekday - 1;

    this.calendarDays = [];

    // Ajouter les jours du mois précédent
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstWeekday - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      this.calendarDays.push({ date, inMonth: false });
    }

    // Ajouter les jours du mois actuel
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      this.calendarDays.push({ date, inMonth: true });
    }

    // Ajouter les jours du mois suivant pour compléter la grille (42 jours = 6 semaines)
    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      this.calendarDays.push({ date, inMonth: false });
    }
  }

  prevMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendarDays();
  }

  selectDate(day: { date: Date; inMonth: boolean }) {
    if (day.inMonth) {
      this.selectedDate = day.date;
      this.dateSelected.emit(day.date);
      this.isVisible = false;

    }
    this.ouvrirFenetreReservation();
  }

  isSelected(date: Date): boolean {
    if (!this.selectedDate) return false;
    return (
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear()
    );
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
  ouvrirFenetreReservation(){
    this.dialog.open(ReservationComponent, {width:'400px'})
  }
}
