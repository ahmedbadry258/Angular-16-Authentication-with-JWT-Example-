import { Component, OnInit } from '@angular/core';
import { LoginRequest } from './../models/LoginRequest';
import { UserService } from './../services/user.service';
import { Route, Router } from '@angular/router';
import { JwtResponse } from './../models/JwtResponse';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { interval } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginRequest: LoginRequest;
  constructor(private userService: UserService,
     private router: Router,
     private toastr: ToastrService,
     private spinner: NgxSpinnerService) {
    this.loginRequest = {
      username: '',
      password: '',
    };
  }
  ngOnInit(): void {}

  onLoginSubmit() {
    this.spinner.show();
    // i made setTimeout function to show spinner
    setTimeout(() => {  this.userService.signin(this.loginRequest).subscribe(
      (data: JwtResponse) => {
        this.router.navigate(['/home'])
        this.toastr.success(`${data.username} You are log in now`,'Success');
        this.spinner.hide();
      },
      (error: any) => {
        this.toastr.error(error.error.details,'Error')
        this.spinner.hide();
      }
    );
    }, 2000);


  }
}
