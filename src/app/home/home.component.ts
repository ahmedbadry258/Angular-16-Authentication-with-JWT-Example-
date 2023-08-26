import { Component, OnInit } from '@angular/core';
import { MessageResponse } from '../models/MessageResponse';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
  {
  messageResponse:MessageResponse;
  constructor(private userService:UserService,private router:Router){
    this.messageResponse={
      message:""
    }
  }
  ngOnInit(): void {
    this.greeting();
  }
  greeting(){
  this.userService.greeting().subscribe(
    (data:MessageResponse) => {this.messageResponse=data},
    (error )=>{console.log(error);
    if(error instanceof HttpErrorResponse){
      if(error.status === 401){
        this.router.navigate(['/sign-in'])
      }

    }
    }
  )
}
}
