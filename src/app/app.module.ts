import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { WorkComponent } from './pages/workPage/work.component';
import { ProfileComponent } from './pages/profilePage/profile.component';
import { StatsComponent } from './pages/statsPage/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    StatsComponent,
    WorkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [ HttpClientModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
