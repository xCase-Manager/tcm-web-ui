import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routerConfig';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectCreateComponent } from './components/project/projectCreate/project-create.component';
import { ProjectDetailsComponent } from './components/project/projectDetails/project-details.component';
import { ProjectsListComponent } from './components/project/projectsList/projects-list.component';
import { TestcasesListComponent } from './components/project/testcasesList/testcases-list.component';
import { ProjectService } from './components/project/project.service';
import { NgbdSortableHeader } from './components/project/projectsList/sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    NgbdSortableHeader,
    ProjectComponent,
    ProjectDetailsComponent,
    ProjectCreateComponent,
    ProjectsListComponent,
    TestcasesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    NgbModule
  ],
  exports: [RouterModule],
  providers: [
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}