import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '../subscription.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.page.html',
  styleUrls: ['./edit-subscription.page.scss'],
})
export class EditSubscriptionPage implements OnInit {
  _subscriptid;
  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(private router: Router, private route: ActivatedRoute,  private loadingController: LoadingController,
    private Subs: SubscriptionService,public formBuilder: FormBuilder) { }

  ngOnInit() {

    this.ionicForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      milk: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      phone :['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      deliveryFrequency :['',[Validators.required]],
      invoiceNumber: ['',[Validators.required]],
     
      // file:['',Validators.required]

    })
    this._subscriptid = this.route.snapshot.paramMap.get("id");
    console.log(this._subscriptid);
    this.getSubscriptionById();
  }
  async getSubscriptionById(){
   
    let loading = await this.loadingController.create({
      message:"Loading Subscription...",
      spinner:"lines"
    })
    await loading.present();
  
  this.Subs.getSubscriptionById(this._subscriptid).subscribe(async (subscript) =>{
    console.log(subscript);
  //   this.ionicForm.setValue({emailId: subscript['subscription']['emailId'],address: subscript['subscription']['address'],milk:subscript['subscription']['milk'],phone: subscript['subscription']['phone'],deliveryFrequency: subscript['subscription']['deliveryFrequency'],
  //   invoiceNumber:subscript['subscription']['invoiceNumber']
  // });
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
