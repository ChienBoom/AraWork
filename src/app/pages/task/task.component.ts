import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  displayedColumns: string[] = [
    'position',
    'name',
    'projectId',
    'priority',
    'status',
    'description',
  ];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.dataSource.data = this.taskService.getData().map((x: any, index) => {
      x.position = index + 1;
      return x;
    });
  }
}
