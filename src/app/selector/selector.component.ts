import {Component, OnInit} from '@angular/core';
import { DateService } from './../shared/date.service';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit{

  date$: Observable<moment.Moment>;

  constructor(private dateService: DateService) {}
  go(dir: number) {
    this.dateService.changeMonth(dir);
  }

  ngOnInit(): void {
    this.date$ = this.dateService.date;
  }
}
