import {Injectable, ModuleWithComponentFactories} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  static url = 'https://isdayoff.ru';
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());
  private cacheMap = new Map();

  constructor(private http: HttpClient) {
  }

  changeMonth(dir: number) {
    const value = this.date.value.add(dir, 'month');
    this.date.next(value);
  }

  changeDay(day: moment.Moment) {
    const value = this.date.value.set({
      date: day.date(),
      month: day.month()
    });
    this.date.next(value);
  }

  isDayOff(date: moment.Moment): Observable<boolean> {
    const cached = this.cacheMap.get(date.format('DD.MM.YYYY'));
    if (cached == undefined) {
      return this.http
        .get<string>(`${DateService.url}/${date.format('YYYYMMDD')}`)
        .pipe(
          map(res => {
            this.cacheMap.set(date.format('DD.MM.YYYY'), res);
            return res == '1';
          })
        );
    }
    return of(cached);
  }

}
