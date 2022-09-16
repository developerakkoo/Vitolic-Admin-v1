import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.page.html',
  styleUrls: ['./edit-users.page.scss'],
})
export class EditUsersPage implements OnInit {
  _UserId;
  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(private router: Router, private route: ActivatedRoute,  private loadingController: LoadingController,
    private UsersSer: UsersService,public formBuilder: FormBuilder) { }

  ngOnInit() {

    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // milk: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // file:['',Validators.required]

    })
 
    this._UserId = this.route.snapshot.paramMap.get("id");
    console.log(this._UserId);
    this.getUsersById();

  }

  async getUsersById(){
   
    let loading = await this.loadingController.create({
      message:"Loading users...",
      spinner:"lines"
    })
    await loading.present();
  

  this.UsersSer.getUsersById(this._UserId).subscribe(async (user) =>{
    console.log(user);
    this.ionicForm.setValue({email:user['user']['email'] , password:user['user']['password']});
    await loading.dismiss();
  
  },async (error) =>{
    console.log(error);
    
  })
  await loading.dismiss();








}







get errorControl() {
  return this.ionicForm.controls;
}
submitForm() {
  this.isSubmitted = true;
  if (!this.ionicForm.valid) {
    console.log('Please provide all the required values!')
    return false;
  } else {
    console.log(this.ionicForm.value)
  }
}
}
