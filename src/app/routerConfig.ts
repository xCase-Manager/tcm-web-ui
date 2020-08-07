import { Routes } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { ProjectSearchComponent } from './components/project/search/projectSearch.component';
import { TestcaseComponent } from './components/testcase/testcase.component';
import { TestcaseSearchComponent } from './components/testcase/search/testcaseSearch.component';

export const appRoutes: Routes = [
  //projects
  { path: 'project',
    component: ProjectComponent 
  },
  { path: 'project/:id', 
    component: ProjectComponent 
  },
  { path: 'projects', 
    component: ProjectSearchComponent 
  },
  //testcases
  { path: 'project/:id/testcases', 
    component: TestcaseSearchComponent 
  },
  { path: 'testcase',
    component: TestcaseComponent 
  },
  { path: 'testcase/:id', 
    component: TestcaseComponent 
  },
  { path: 'testcases', 
    component: TestcaseSearchComponent 
  }
];