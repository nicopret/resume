import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkComponent } from './pages/workPage/work.component';
import { ProfileComponent } from './pages/profilePage/profile.component';
import { StatsComponent } from './pages/statsPage/stats.component';
import { EducationComponent } from './pages/educationPage/education.component';
import { SkillsComponent } from './pages/skillsPage/skills.component';
import { ModalComponent } from './dashboard/modal/modal.component';
import { DataService } from './services/data/data.service';
import { WordExportService } from './services/word/word-export.service';
import { ApiService } from './services/api/api.service';
import { ArrayUtilService } from './services/util/arrayUtil.service';
import { DateUtilService } from './services/util/dateUtil.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EducationComponent,
    ModalComponent,
    ProfileComponent,
    SkillsComponent,
    StatsComponent,
    WorkComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [ HttpClientModule ],
  providers: [ ApiService, ArrayUtilService, DataService, DateUtilService, WordExportService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
