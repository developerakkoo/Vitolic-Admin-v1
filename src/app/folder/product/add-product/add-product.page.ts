import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  ionicForm: FormGroup;

  isSubmitted = false;
  imageUrl: any;
  fileToUpload: File= null;
  // file: File;

  item;
 
  hasDiscountedPrice: boolean = false;
  
  constructor(public formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController) {

               }

  ngOnInit() {
    this.ionicForm = 
    this.formBuilder.group({
      title: [, [Validators.required, Validators.minLength(2)]],
      category: [, [Validators.required]],
      file: [, [Validators.required, ]],
      discountedPrice:[,],
      Price:[,[Validators.required]],
      units :[,[Validators.required]],
      Stock :[,[Validators.required]],
      d1 :[,[Validators.required, Validators.min(20)]],
      d2 :[""],
      d3 :[""],
    })
  }


  get errorControl() {
    return this.ionicForm.controls;
  }

  DiscountPriceEvent(ev:any){
    console.log(ev);
    this.hasDiscountedPrice = ev.detail.checked;
    console.log(this.hasDiscountedPrice);
    
    
  }

  fileEvent(ev){
    console.log(ev.target.files[0])
    this.fileToUpload = ev.target.files[0];
     

  }

 async presentLoading(msg){
    let loading = await this.loadingController.create({
      message: msg,
      duration: 6000
    })
    
    await loading.present();
  }


  submitForm() {
   
      console.log(this.ionicForm.value.title)

      this.presentLoading("Add new product...");
      
    if(this.hasDiscountedPrice){
      let formdata = new FormData();

    formdata.append("title", this.ionicForm.value.title);
    formdata.append("category", this.ionicForm.value.category);
    formdata.append("discountedPrice", this.ionicForm.value.discountedPrice);
    formdata.append("hasDiscountedPrice", "true");
    formdata.append("price", this.ionicForm.value.Price);
    formdata.append("units", this.ionicForm.value.units);
    formdata.append("stock", this.ionicForm.value.Stock);
    formdata.append("descOne", this.ionicForm.value.d1);
    formdata.append("descTwo", this.ionicForm.value.d2);
    formdata.append("descThree", this.ionicForm.value.d3);
    formdata.append("inStock", "true");
    formdata.append("file", this.fileToUpload, this.fileToUpload.name);
    this.http.post(environment.Url + '/products', formdata)
    .subscribe((product) =>{
      console.log(product);
      
      this.loadingController.dismiss();
      this.router.navigate(['folder','product']);
      
    },async (err)=>{
      this.loadingController.dismiss();
    })
    }

    else if(!this.hasDiscountedPrice){
      let formdata = new FormData();

      formdata.append("title", this.ionicForm.value.title);
      formdata.append("category", this.ionicForm.value.category);
      formdata.append("price", this.ionicForm.value.Price);
      formdata.append("hasDiscountedPrice", "false");
      formdata.append("discountedPrice", this.ionicForm.value.Price);

      formdata.append("units", this.ionicForm.value.units);
      formdata.append("stock", this.ionicForm.value.Stock);
      formdata.append("descOne", this.ionicForm.value.d1);
      formdata.append("descTwo", this.ionicForm.value.d2);
      formdata.append("descThree", this.ionicForm.value.d3);
      formdata.append("inStock", "true");
      formdata.append("file", this.fileToUpload, this.fileToUpload.name);
      this.http.post(environment.Url + '/products', formdata)
      
      .subscribe((product) =>{
        console.log(product);
        
        this.loadingController.dismiss();
        this.router.navigate(['folder','product']);
        
      },async (err)=>{
        this.loadingController.dismiss();
      })
    }

   
    


  }


  
}
