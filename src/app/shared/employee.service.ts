import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Employee {
  id?: string
  name: string;
}

@Injectable({providedIn: 'root'})
export class EmployeeService {

  url:string = 'assets/employeesList.json';

  constructor(private http: HttpClient) {
  };

  load(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url)
      .pipe(
        map(list => {
          if (!list) {
            return [];
          }
          // console.log(list)
          return Object.keys(list).map(key => ({...list[key], id: key}));
        })
      );
  }

}
