import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { SendNotifyPage } from 'src/app/send-notify/send-notify.page';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any[] = [];
  getUsersSub: Subscription;
  constructor(private UsersSer: UsersService,
    private router: Router,
    private modalController: ModalController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllUsers()
  }


  openEditPage(user) {
    console.log(user._id);
    this.router.navigate(['folder', 'users', 'edit-users', user._id]);

  }

  openAddUserPage(){
    this.router.navigate(['folder', 'users', 'add-user']);
  }

  openAddSubscriptionPage(user){
    console.log(user);
    this.router.navigate(['folder', 'users', 'list-products', user._id]);
    
  }
  IonViewDidLeave() {
    this.getUsersSub.unsubscribe();
  }


  async getAllUsers() {
    let loading = await this.loadingController.create({
      message: "Loading  Users...",
      spinner: "lines"
    })





    await loading.present();



    this.getUsersSub = this.UsersSer.getAllUsers()
      .subscribe(async (Users: any) => {
        console.log(Users);
        this.users = Users['users'];
        await loading.dismiss();
      }, async (error) => {
        console.log(error);
        await loading.dismiss();
      })
  }


  async sendNotifyModal(token) {
    const modal = await this.modalController.create({
      component: SendNotifyPage,
      componentProps: { token: token }
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data)

  }


  sendNotification(token) {
    console.log(token);
    if (token == null || token == "") {
      console.log("Token undefined");

    }

    this.sendNotifyModal(token);


  }


  deleteUsertClick(id) {
    this.UsersSer.deleteUsers(id)
      .subscribe(async (product) => {
        console.log(product);
        this.getAllUsers();

      }, async (error) => {
        console.log(error);

      })
  }
}

