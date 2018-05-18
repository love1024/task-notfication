import { Component } from '@angular/core';
import { SwPush } from "@angular/service-worker";
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apps';
  VAPID_PUBLIC_KEY = "BL9LgfHTIjkFSpDeCBL_bItVydd3cowIihsQKR5XWtey0jHiK-nHyMzgTdur-SXKwCJ46By0vaMeoTcTKhcmYE0";

  constructor(private swPush: SwPush, private dataService: DataService) {
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.dataService.addPushSubscriber(sub).subscribe())
      .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
