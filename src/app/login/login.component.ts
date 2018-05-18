import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }


  onLogin() {
    this.dataService.saveUserData({ email: this.email, password: this.password }).subscribe(() => {
      console.log("SAVED USER DATA");
      this.router.navigateByUrl("/manager");
    });
  }
}
