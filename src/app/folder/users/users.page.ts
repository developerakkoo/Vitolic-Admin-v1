import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users:any[] =[];
  getUsersSub: Subscription;
  constructor(private UsersSer:UsersService, private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllUsers()
  }


  openEditPage(user){
    console.log(user._id);
    this.router.navigate(['folder', 'users','edit-users', user._id]);
    
  }

  IonViewDidLeave(){
    this.getUsersSub.unsubscribe();
  }


  async getAllUsers(){
    let loading = await this.loadingController.create({
      message:"Loading  Users...",
      spinner:"lines"
    })
  
  
  
  
  
    await loading.present();



    this.getUsersSub = this.UsersSer.getAllUsers()
    .subscribe(async(Users:any) =>{
      console.log(Users);
      this.users = Users['users'];
      await loading.dismiss();
    }, async (error)=>{
      console.log(error);
      await loading.dismiss();
    })
  }



  deleteUsertClick(id){
    this.UsersSer. deleteUsers(id)
    .subscribe(async (product) =>{
      console.log(product);
      this. getAllUsers();
      
    }, async (error) =>{
      console.log(error);
      
    })
  }
  }

