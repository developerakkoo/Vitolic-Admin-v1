import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HandlerService } from 'src/app/handler.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.page.html',
  styleUrls: ['./edit-users.page.scss'],
})
export class EditUsersPage implements OnInit {
  _UserId;
  ionicForm: FormGroup;
  isSubmitted = false;

  putUserSub!: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private handler: HandlerService,
    private UsersSer: UsersService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      fName: [],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contactNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      couponCode: [],
      // walletCashbackAvailable: [],
    });

    this._UserId = this.route.snapshot.paramMap.get('id');
    console.log(this._UserId);
    this.getUsersById();
  }

 
  async getUsersById() {
   this.handler.presentLoading('Loading users...')

    this.UsersSer.getUsersById(this._UserId).subscribe(
      async (user) => {
        console.log(user);
        this.ionicForm.setValue({
          email: user['user']['email'],
          contactNumber: user['user']['contactNumber'],
          fName: user['user']['fName'],
          couponCode: user['user']['couponCode'],
          // walletCashbackAvailable: user['user']['walletCashbackAvailable'],
        });
        await this.handler.dismissLoading();
      },
      async (error) => {
        console.log(error);
       await this.handler.dismissLoading();
      
      }
    );
  
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
  submitForm() {
    console.log(this.ionicForm.value);
    this.handler.presentLoading('Updating User...');
    let body = {
      fName: this.ionicForm.value.fName,
      couponCode: this.ionicForm.value.couponCode,
      email: this.ionicForm.value.email,
      contactNumber: this.ionicForm.value.contactNumber
    }

    this.putUserSub = this.http.put(environment.Url + `/user/profiles/${this._UserId}`, body)
    .subscribe({
      next:(value) =>{
        console.log(value);
        this.handler.dismissLoading();
        this.handler.presentToast("User updated successfully", 3000, 'top');
        this.getUsersById();
        
      },
      error:(error) =>{
        console.log(error);
        this.handler.dismissLoading();
        this.handler.presentToast("User updated successfully", 3000, 'top');

        
      }
    })



  }
}
