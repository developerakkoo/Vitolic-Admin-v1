import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HandlerService } from 'src/app/handler.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  form!: FormGroup;

  postUserSub!: Subscription;
  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private handler: HandlerService) {
                this.form = this.fb.group({
                  name: [null, [Validators.required, Validators.minLength(3)]],
                  // texadd: [null, [Validators.required]],
                  email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
                  mobnoctrl: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
                  
                });
               }

  ngOnInit() {
  }

  ionViewDidLeave(){
    this.postUserSub.unsubscribe();
  }


  onSubmit(){
    this.handler.presentLoading('Creating user...')
    console.log(this.form);
    let body = {
      fName: this.form.value.name,
      email: this.form.value.email,
      contactNumber: this.form.value.mobnoctrl,
      token: ""
     
    }
    this.postUserSub = this.http.post(environment.Url +`/user/register`, body)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.handler.dismissLoading();
        this.handler.presentToast("User Created Successfully", 3000, 'top')
        
      },
      error:(error) =>{
        console.log(error);
        this.handler.dismissLoading();
        this.handler.presentToast("Error creating user", 2000, 'top')

        
      }
    })

    
  }

}
