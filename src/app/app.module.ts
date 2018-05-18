import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ServiceWorkerModule } from '@angular/service-worker';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { DataService } from './services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'manager', component: ManagerComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ]),
    ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
