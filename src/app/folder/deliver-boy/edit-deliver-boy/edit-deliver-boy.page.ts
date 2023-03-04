import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliverBoyService } from '../deliver-boy.service';
@Component({
  selector: 'app-edit-deliver-boy',
  templateUrl: './edit-deliver-boy.page.html',
  styleUrls: ['./edit-deliver-boy.page.scss'],
})
export class EditDeliverBoyPage implements OnInit {
  _deliversid;
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router, private route: ActivatedRoute,  private loadingController: LoadingController,
    private DeliverSer: DeliverBoyService,public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      contactNumber: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      fullName: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // password: ['',[Validators.required]]
      // file:['',Validators.required]

    })
    this._deliversid = this.route.snapshot.paramMap.get("id");
    console.log(this._deliversid);
    this.getBoyById();
  }
  
  async getBoyById(){
   
    let loading = await this.loadingController.create({
      message:"Loading Delivery Boy...",
      spinner:"lines"
    })
    await loading.present();
  
  this.DeliverSer.getBoyById(this._deliversid).subscribe(async (boy) =>{
    console.log(boy);
    this.ionicForm.setValue({email: boy['boy']['email'] ,contactNumber: boy['boy']['contactNumber'],fullName:boy['boy']['fullName'], password:boy['boy']['password']});
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
