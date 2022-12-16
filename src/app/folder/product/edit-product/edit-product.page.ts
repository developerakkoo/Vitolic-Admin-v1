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
  isFileSelected: boolean = false;


  getProductSub: Subscription;
  constructor(public formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private productS: ProductService,
    private alertController: AlertController,
    private loadingController: LoadingController) {
      this._productId = this.route.snapshot.paramMap.get('id');
     }

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
    this.isFileSelected = true;

  }

  ionViewDidEnter(){
    this.getProductById();
  }
  async getProductById() {
    let loading = await this.loadingController.create({
      message: "Loading products...",
      spinner: "lines"
    })

    await loading.present();

    this.getProductSub = this.productS.getProductById(this._productId)
      .subscribe(async (product: any) => {
        console.log(product);
        let title = product['products']['title'];
        let price = product['products']['price'];
        let discountedPrice = product['products']['discountedPrice'];
        let category = product['products']['category'];
        let stock = product['products']['stock'];
        let units = product['products']['units'];
        this.imageUrl = product['products']['imageUrl'];

        this.ionicForm.setValue({title: title , Price: price, discountedPrice: discountedPrice, category: category,Stock: stock, units: units, file: ""})
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

    this.presentLoading("Updating product...");

    if(this.isFileSelected == true){
      let formdata = new FormData();

    formdata.append("title", this.ionicForm.value.title);
    formdata.append("category", this.ionicForm.value.category);
    formdata.append("discountedPrice", this.ionicForm.value.discountedPrice);
    formdata.append("price", this.ionicForm.value.Price);
    formdata.append("units", this.ionicForm.value.units);
    formdata.append("stock", this.ionicForm.value.Stock);
    formdata.append("inStock", "true");
    formdata.append("file", this.fileToUpload, this.fileToUpload.name);


    this.http.put(environment.Url + `/products/image/${this._productId}`, formdata)
      .subscribe((product) => {
        console.log(product);

        this.loadingController.dismiss();
        this.router.navigate(['folder', 'product']);

      }, async (err) => {
        this.loadingController.dismiss();
      })

    }else {
      let formdata = new FormData();

    formdata.append("title", this.ionicForm.value.title);
    formdata.append("category", this.ionicForm.value.category);
    formdata.append("discountedPrice", this.ionicForm.value.discountedPrice);
    formdata.append("price", this.ionicForm.value.Price);
    formdata.append("units", this.ionicForm.value.units);
    formdata.append("stock", this.ionicForm.value.Stock);
    formdata.append("inStock", "true");
    formdata.append("imageUrl", this.imageUrl);


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

}
