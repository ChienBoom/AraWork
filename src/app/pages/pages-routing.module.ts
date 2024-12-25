import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskComponent } from './task/task.component';
import { DocumentComponent } from './document/document.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: PagesComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'task', component: TaskComponent },
      { path: 'document', component: DocumentComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
