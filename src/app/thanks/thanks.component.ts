import { Component, OnInit } from '@angular/core';
import { SwPush } from "@angular/service-worker";
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {
  email: any;

  VAPID_PUBLIC_KEY = "BL9LgfHTIjkFSpDeCBL_bItVydd3cowIihsQKR5XWtey0jHiK-nHyMzgTdur-SXKwCJ46By0vaMeoTcTKhcmYE0";
  constructor(private swPush: SwPush, private dataService: DataService, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params: Params) => {
      this.email = params['email'];
    });

  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.dataService.addPushSubscriber({ sub, "email": this.email }).subscribe())
      .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
