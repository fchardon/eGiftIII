import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'ec-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login implements OnInit {

  credentials = {
    login: '',
    password: ''
  };
  authenticationFailed = false;

  constructor(private router: Router/*, private userService: UserService*/) {
  }

  ngOnInit() {
  }

  authenticate() {
    /*this.authenticationFailed = false;
    this.userService.authenticate(this.credentials)
      .subscribe(
        () => this.router.navigate(['/']),
        () => this.authenticationFailed = true
      );*/
  }

}
