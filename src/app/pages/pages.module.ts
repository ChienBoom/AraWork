import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { DocumentComponent } from './document/document.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    CalendarComponent,
    ProjectComponent,
    TaskComponent,
    DocumentComponent,
  ],
})
export class PagesModule {}
