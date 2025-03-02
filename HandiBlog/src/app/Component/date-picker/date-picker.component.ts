import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarComponent} from '../calendar/calendar.component';


@Component({
  selector : 'app-date-picker',
  standalone: true,
  imports: [CommonModule, CalendarComponent],
  templateUrl: 'date-picker.component.html'
})

export class DatePickerComponent {
  selectedDate: Date = new Date();
  isCalendarVisible = false;

  toggleCalendar() {
    this.isCalendarVisible = !this.isCalendarVisible;
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.isCalendarVisible = false;
    console.log('Date sélectionnée:', date);
  }
}
