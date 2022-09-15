import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  _productId;
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router, private route: ActivatedRoute,  private loadingController: LoadingController,
              private productS: ProductService,public formBuilder: FormBuilder) {
   
   }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      category: ['', [Validators.required]],
      discountedPrice :['',[Validators.required]]
      // file:['',Validators.required]

    })
    this._productId = this.route.snapshot.paramMap.get("id");
    console.log(this._productId);
    this.getProductById();
  }

  async getProductById(){
   
      let loading = await this.loadingController.create({
        message:"Loading products...",
        spinner:"lines"
      })
      await loading.present();
    
    this.productS.getProductById(this._productId).subscribe(async (product) =>{
      console.log(product);
      this.ionicForm.setValue({title: product['products']['title'] ,price: product['products']['price'],category: product['products']['category'], discountedPrice: product['products']['discountedPrice'],   });
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
