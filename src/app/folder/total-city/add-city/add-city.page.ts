import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController } from '@ionic/angular';
import { DeliverBoyService } from '../../deliver-boy/deliver-boy.service';
import { Subscription } from 'rxjs';
import { CityService } from '../city.service';
@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.page.html',
  styleUrls: ['./add-city.page.scss'],
})
export class AddCityPage implements OnInit {
  ionicForm: FormGroup;

  isSubmitted = false;
  getDeliverBoySub: Subscription;
  postCitySub: Subscription;

  deliveryboy = [];
 
  constructor(public formBuilder: FormBuilder,
              private loadingController: LoadingController,
              private DeliverS: DeliverBoyService,
              private cityService: CityService) { }

  ngOnInit() {
    this.getAllDeliver();
    this.ionicForm = this.formBuilder.group({
      pincode: ['', [Validators.required, Validators.minLength(2)]],
      areaName: ['', [Validators.required]],
      deliveryState: [, [Validators.required]],
      divisionName: [, [Validators.required]],
      region: [, [Validators.required]],
      taluka: [, [Validators.required]],
      district: [, [Validators.required]],
      state: [, [Validators.required]],
      center: [, [Validators.required]],
      route: [, [Validators.required]],
      deliveryPerson: [, [Validators.required]],
     
    })
  }
  get errorControl() {
    return this.ionicForm.controls;
  }

  IonViewDidLeave(){
    this.getDeliverBoySub.unsubscribe();
    this.postCitySub.unsubscribe();
  }
  async getAllDeliver(){
    
    let loading = await this.loadingController.create({
      message:"Loading Delivery Boy...",
      spinner:"lines"
    })
    await loading.present();
    this.getDeliverBoySub = this.DeliverS.getAllDeliver()
    .subscribe(async(Deliver:any) =>{
      
      console.log(Deliver);
      this.deliveryboy = Deliver['boy'];
      await loading.dismiss();
    },
     async (error)=>{
      console.log(error);
      
      await loading.dismiss();
    })
  }

  async submitForm() {
    let loading = await this.loadingController.create({
      message:"Creating City...",
    })
    await loading.present();
    let body = {
      ...this.ionicForm.value
    }
    console.log(body);
   this.postCitySub =  this.cityService.addCity(body)
    .subscribe((data) =>{
      if(data){
        console.log(data);
        this.loadingController.dismiss();
        
      }
    }, (error) =>{
      console.log(error);
      this.loadingController.dismiss();
      
    })
    
  }
}
