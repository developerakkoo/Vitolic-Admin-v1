import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  _productId;
  ionicForm: FormGroup;

  isSubmitted = false;
  imageUrl: any;
  fileToUpload: File = null;
  // file: File;

  item;

  getProductSub: Subscription;
  constructor(public formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private productS: ProductService,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required]],
      file: ['', [Validators.required,]],
      discountedPrice: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      units: ['', [Validators.required]],
      Stock: ['', [Validators.required]]
    })
  }
  get errorControl() {
    return this.ionicForm.controls;
  }

  fileEvent(ev) {
    console.log(ev.target.files[0])
    this.fileToUpload = ev.target.files[0];


  }
  async getAllProducts() {
    let loading = await this.loadingController.create({
      message: "Loading products...",
      spinner: "lines"
    })

    await loading.present();

    this.getProductSub = this.productS.getAllProducts()
      .subscribe(async (products: any) => {
        console.log(products);

        await loading.dismiss();
      }, async (error) => {
        console.log(error);
        await loading.dismiss();

      })
  }

  async presentLoading(msg) {
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


    this.http.put(environment.Url + `/products/${this._productId}`, formdata)
      .subscribe((product) => {
        console.log(product);

        this.loadingController.dismiss();
        this.router.navigate(['folder', 'product']);

      }, async (err) => {
        this.loadingController.dismiss();
      })



  }

}
