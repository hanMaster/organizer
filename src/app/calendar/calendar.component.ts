import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../shared/date.service';

interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
  dayOff: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendar: Week[];
  dayOff: boolean;

  constructor(private dateService: DateService) {
    this.dayOff = false;
  }

  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this));
  }

  generate(now: moment.Moment) {
    now.locale('ru');
    const startDay = now
      .clone()
      .startOf('month')
      .startOf('isoWeek');
    const endDay = now
      .clone()
      .endOf('month')
      .endOf('isoWeek');
    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');
            return {value, active, disabled, selected};
          })
      });
    }

    calendar.forEach(week => {
      week.days.forEach(day => {
        this.dateService.isDayOff(day.value).subscribe(
          res => {
            day.dayOff = res;
          },
          err => console.error(err)
        );
      });
    });


    this.calendar = calendar;
  }

  select(day: moment.Moment) {
    this.dateService.changeDay(day);
  }

}
