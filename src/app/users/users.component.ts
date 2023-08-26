import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';
import { MessageResponse } from '../models/MessageResponse';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  messageResponse:MessageResponse;
  constructor(private userService:UserService){
    this.messageResponse={
      message:""
    }
  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
  this.userService.getUsers().subscribe(
    (data:MessageResponse) => {this.messageResponse=data
console.log(data)
    },
    (error :Error)=>console.log(error)
  )
}
}
