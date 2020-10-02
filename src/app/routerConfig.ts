import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectComponent } from './components/project/project.component';

export const appRoutes: Routes = [
  { path: 'dashboard',
    component: DashboardComponent
  },
  { path: 'projects',
    component: ProjectComponent
  },
  { path: '',
    component: DashboardComponent
  }
];