import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NavComponent } from './shared/layout/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { PathNotFoundComponent } from './pages/path-not-found/path-not-found.component';
import { MaterialModule } from './shared/material/material.modul';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    HomeComponent,
    PathNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
