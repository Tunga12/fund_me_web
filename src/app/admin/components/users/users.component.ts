import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AdminUsersService } from '../../services/admin-users/admin-users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loading:boolean=false;
  errorMessage:string='';
  users:User[]=[];
  user?:User;
  constructor(
    private useSrv:AdminUsersService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getAllUsers();
  }

  search(email:string){
    let user:User|undefined;
        user=this.users.find(_user=>_user.email.toLowerCase()===email.toLowerCase());
        console.log(user);
     this.user=user;
  }

  //get all users
  async getAllUsers(){
    await this.useSrv.getAllUsers().then(
      (users)=>{
        this.users=users;
      },
      (error:HttpErrorResponse)=>{
        this.errorMessage=error.error;
        console.log(error.error);
      }
    );
    
  }

  verifyUser(userToVerify:User){
    console.log(userToVerify);
    this.useSrv.verifyUser(userToVerify._id!,userToVerify)
    .subscribe((user)=>{
      console.log(user);
      this.user=user;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.error);
      this.errorMessage=error.error;
    });
  }
  
  unVerifyUser(userToVerify:User){
    console.log(userToVerify);
    this.useSrv.unVerifyUser(userToVerify._id!,userToVerify)
    .subscribe((user)=>{
      console.log(user);      
      this.user=user;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.error);
      this.errorMessage=error.error;
    });
  }


}
