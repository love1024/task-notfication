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
import { ThanksComponent } from './thanks/thanks.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerComponent,
    ThanksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'manager', component: ManagerComponent },
      { path: 'thanks', component: ThanksComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ]),
    ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
