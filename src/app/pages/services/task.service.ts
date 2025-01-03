import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from 'src/app/data/Task.data';
import { Projects } from 'src/app/data/project.data';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseService {
  tasks: any[] = Tasks;
  constructor(http: HttpClient) {
    super(http);
  }

  public getData(): any[] {
    return this.tasks;
  }
}
