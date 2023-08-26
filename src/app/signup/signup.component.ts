import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { MessageResponse } from '../models/MessageResponse';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user :User;
  constructor( private userService : UserService,
     private router: Router,
     private toastr: ToastrService){
this.user={
  id:0,
  username:"",email:"",password:""
}
  }
  ngOnInit(): void {

  }
onSubmit(){
  this.userService.signUp(this.user).subscribe(
(data: MessageResponse)=>{
  this.toastr.success( data.message,'Success');
  this.router.navigateByUrl("sign-in")},
(error:any)=>{console.log(error)
  this.toastr.error( error.error.message,'Error')}
  )

}
}
