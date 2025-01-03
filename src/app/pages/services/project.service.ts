import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projects } from 'src/app/data/project.data';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService {
  projects: any[] = Projects;
  constructor(http: HttpClient) {
    super(http);
  }

  public getData(): any[] {
    return this.projects;
  }
}
