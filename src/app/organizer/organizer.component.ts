import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TasksService, Task } from '../shared/tasks.service';
import { switchMap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;
  tasks: Task[] = [];
  date$: Observable<moment.Moment>;

  constructor(
    private dateService: DateService,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.dateService.date
      .pipe(switchMap(value => this.tasksService.load(value)))
      .subscribe(tasks => (this.tasks = tasks));
    this.date$ = this.dateService.date;

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  submit() {
    const { title } = this.form.value;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };
    this.tasksService.create(task).subscribe(
      task => {
        this.form.reset();
        this.tasks.push(task);
      },
      err => console.error(err)
    );
  }

  remove(task: Task) {
    this.tasksService.remove(task).subscribe(
      () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      err => console.error(err)
    );
  }
}
