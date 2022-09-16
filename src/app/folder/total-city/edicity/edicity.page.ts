import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../city.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-edicity',
  templateUrl: './edicity.page.html',
  styleUrls: ['./edicity.page.scss'],
})
export class EdicityPage implements OnInit {
  _totalcityId;
  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(private router: Router, private route: ActivatedRoute,  private loadingController: LoadingController,
    private totalcity: CityService,public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      areaName: ['', [Validators.required, Validators.minLength(2)]],
      pincode: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // file:['',Validators.required]

    })
    this. _totalcityId = this.route.snapshot.paramMap.get("id");
    console.log(this. _totalcityId);
    this.getCitytById();
  }
  async getCitytById(){
   
    let loading = await this.loadingController.create({
      message:"Loading pincodes...",
      spinner:"lines"
    })
    await loading.present();
  
  this.totalcity.deleteCity(this._totalcityId).subscribe(async (pincode) =>{
    console.log(pincode);
    this.ionicForm.setValue({areaName: pincode['pincode']['areaName'] ,pincode: pincode['pincode']['pincode']});
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
