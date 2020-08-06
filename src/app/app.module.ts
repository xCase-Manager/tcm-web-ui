import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routerConfig';
import { FormBuilder, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';

import { BsDropdownModule, TabsModule, PaginationModule } from 'ngx-bootstrap';

// search component
import { FilterPipeModule } from 'ngx-filter-pipe'; //importing the module
import { OrderModule } from 'ngx-order-pipe'; //importing the module
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';

import { ProjectCreateComponent } from './components/project/project-create/project-create.component';
import { ProjectCreateService } from './components/project/project-create/project-create.service';
import { ProjectComponent } from './components/project/project.component';
import { ProjectMenuComponent } from './components/project/menu/projectMenu.component';
import { ProjectSearchComponent } from './components/project/search/projectSearch.component';
import { ProjectViewComponent } from './components/project/view/projectView.component';
import { ProjectService } from './components/project/project.service';
import { TestcaseService } from './components/testcase/testcase.service';
import { TestcaseComponent } from './components/testcase/testcase.component';
import { TestcaseViewComponent } from './components/testcase/view/testcaseView.component';
import { TestcaseMenuComponent } from './components/testcase/menu/testcaseMenu.component';
import { TestcaseSearchComponent } from './components/testcase/search/testcaseSearch.component';
import { TestcaseCreateComponent } from './components/testcase/testcase-create/testcase-create.component';
import { TestcaseCreateService } from './components/testcase/testcase-create/testcase-create.service';
import { LoaderComponent } from './components/loader/loader.component';
import { Filter } from './utils/filter';
import { Globals } from './globals';

@NgModule({
  declarations: [
    AppComponent,
    ProjectCreateComponent,
    ProjectComponent,
    ProjectMenuComponent,
    ProjectSearchComponent,
    ProjectViewComponent,
    MenuComponent,
    TestcaseComponent,
    TestcaseMenuComponent,
    TestcaseCreateComponent,
    TestcaseViewComponent,
    TestcaseSearchComponent,
    LoaderComponent,
    Filter
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    NgxDatatableModule,
    //search component
    FilterPipeModule, //including into imports
    OrderModule, // importing the sorting package here
    NgxPaginationModule
  ],
  providers: [TestcaseService, TestcaseCreateService, ProjectService, ProjectCreateService, FormBuilder, HttpClient, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
