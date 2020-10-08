import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectCreateComponent } from './components/project/projectCreate/project-create.component';
import { ProjectDetailsComponent } from './components/project/projectDetails/project-details.component';
import { ProjectsListComponent } from './components/project/projectsList/projects-list.component';
import { TestcasesListComponent } from './components/project/testcasesList/testcases-list.component';
import { TestcaseDetailsComponent } from './components/project/testcaseDetails/testcase-details.component';
import { ProjectService } from './components/project/project.service';
import { TestcaseService } from './components/project/testcase.service';
import { HttpErrorHandler } from './components/project/http-error-handler.service';
import { MessageService } from './components/project/message.service';
import { NgbdSortableHeader } from './components/project/projectsList/sortable.directive';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { appRoutes } from './routerConfig';


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
    TestcasesListComponent,
    TestcaseDetailsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ChartsModule,
    NgbModule
  ],
  exports: [RouterModule],
  providers: [
    ProjectService, 
    TestcaseService,
    HttpErrorHandler,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}