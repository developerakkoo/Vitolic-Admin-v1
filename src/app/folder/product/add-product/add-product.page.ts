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
 
  
  constructor(public formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required]],
      file: ['', [Validators.required, ] ],
      discountedPrice:['',[Validators.required]],
      Price:['',[Validators.required]],
      units :['',[Validators.required]],
      Stock :['',[Validators.required]]
    })
  }
  get errorControl() {
    return this.ionicForm.controls;
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
      
    let formdata = new FormData();

    formdata.append("title", this.ionicForm.value.title);
    formdata.append("category", this.ionicForm.value.category);
    formdata.append("discountedPrice", this.ionicForm.value.discountedPrice);
    formdata.append("price", this.ionicForm.value.Price);
    formdata.append("units", this.ionicForm.value.units);
    formdata.append("stock", this.ionicForm.value.Stock);
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
