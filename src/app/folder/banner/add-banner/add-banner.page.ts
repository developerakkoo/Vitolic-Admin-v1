import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/error.service';
import { environment } from 'src/environments/environment';
import { BannerService } from '../banner.service';
@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.page.html',
  styleUrls: ['./add-banner.page.scss'],
})
export class AddBannerPage implements OnInit {
  ionicForm: FormGroup;

  isSubmitted = false;
  bannerImage: File;
  _bannerAddSub: Subscription;
  getBannerSub: Subscription;
  constructor(public formBuilder: FormBuilder,
              private error: ErrorService,
              private router: Router,
              private banner: BannerService,
              private loadingController: LoadingController,
              private http: HttpClient) { }

  ngOnInit() {
   
  }
  get errorControl() {
    return this.ionicForm.controls;
  }


  fileEvent(ev){
    console.log(ev.target.files[0])
    this.bannerImage = ev.target.files[0];
     

  }
  async getAllBanner(){
    let loading = await this.loadingController.create({
      message:"Loading Banner...",
      spinner:"lines"
    })
  
  
  
  
  
    await loading.present();
    this.getBannerSub = this.banner.getAllBanner()
    .subscribe(async(banner:any) =>{
      console.log(banner);
      await loading.dismiss();
    }, async (error)=>{
      console.log(error + 'Not Fond');
      await loading.dismiss();
    })
  }
 async submitForm() {
  let loading = await this.loadingController.create({
    message:"Adding banner...",
    duration: 10
  })
    let formdata = new FormData();
    formdata.append('file', this.bannerImage, this.bannerImage.name);

    this._bannerAddSub = 
    this.http
    .post(environment.Url +'/banner', formdata)
    .subscribe(async (data) =>{
      await loading.dismiss();
      this.getAllBanner();
      this.router.navigate(['folder', 'banner']);
    },async (error) =>{
      await loading.dismiss();
      this.error.presentError("Something went wrong", 3000);
    })
  }


  onSave(){
    var element = document.getElementById("myDIV");
    element.classList.add("mystyle");
  }

}
