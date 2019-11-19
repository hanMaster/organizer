import { Component, OnInit } from '@angular/core';
import {DateService} from '../shared/date.service';
import * as moment from 'moment';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-date-banner',
  templateUrl: './date-banner.component.html',
  styleUrls: ['./date-banner.component.css']
})
export class DateBannerComponent implements OnInit {

  date$: Observable<moment.Moment>;
  dayOff: boolean;

  constructor(private dateService: DateService) {

  }

  ngOnInit() {
    this.date$ = this.dateService.date;
    this.dateService.date.subscribe(this.setDayOff.bind(this));
  }

  setDayOff(date: moment.Moment){
    this.dateService.isDayOff(date).subscribe(
      res => {
        this.dayOff = res;
      },
      err => console.error(err)
    );

  }

}
