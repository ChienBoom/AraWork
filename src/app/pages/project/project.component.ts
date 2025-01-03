import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'status', 'description'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.dataSource.data = this.projectService
      .getData()
      .map((x: any, index) => {
        x.position = index + 1;
        return x;
      });
  }
}
