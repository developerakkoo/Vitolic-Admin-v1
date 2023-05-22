import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonModal, IonDatetime, ModalController, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { format ,parseISO} from 'date-fns';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Product, CartService } from 'src/app/cart.service';
import { ProductService } from '../../product/product.service';
import { environment } from 'src/environments/environment';
import { HandlerService } from 'src/app/handler.service';
@Component({
  selector: 'app-custom',
  templateUrl: './custom.page.html',
  styleUrls: ['./custom.page.scss'],
})
export class CustomPage implements OnInit {
  userId;
  productId;
  quantity;
  categories = [];
  selectedAddress: any[];
  activeSelectedAddress: any;
  userWalletBalance;
  selete: any;
  age = 0;
  totalAmount: number;
  totalQuantity: number;


  orderPincode;

  date: any[];

  @ViewChild(IonModal) modal: IonModal;
  message: any;
  // name: string;
  cart: Product[] = [];

  totalCartCount: BehaviorSubject<number>;
  public items: Array<string>;
  itemImage: any;
  product;
  title;
  price;
  discountPrice;
  itemCount;
  isPrint: boolean = true;
  show = false;
  buttonName = 'Show';

  hide: any;
  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;
  //----------------------------------------------
  modes = ['date', 'date-time', 'month', 'month-year', 'time', 'time-date', 'year'];
  selectMode = 'date';
  showPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd');
  startDate;
  formattedString = '';
  @ViewChild(IonDatetime) datetime: IonDatetime;


  monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  selectedMonth;
  dateTillDisabled;



  //-------------------------------------

  myFlagForSlideToggle: boolean = true;
  //hiding info box
  visible: boolean = false;

  isCanvasHidden: boolean = false;

  selectedDay: any[] = [];
  countDay: any;

  msg: string = 'Please select days';
  getProductSub: Subscription;
  getUserProfileSub: Subscription;
  getUserAddSub:Subscription;
  userProfileWalletUpdateSub: Subscription;
  placeOrderSub: Subscription;
  createCartOrdersSub: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private cartService: CartService,
    private alertController: AlertController,
    private productService: ProductService,
    private loadingController: LoadingController,
    private handler: HandlerService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private http: HttpClient,
    ) {
    this.productId = this.route.snapshot.paramMap.get("productId");
    this.quantity = this.route.snapshot.paramMap.get("amount");
    this.activeSelectedAddress = this.route.snapshot.paramMap.get("address");
    this.userId = this.route.snapshot.paramMap.get("userId");
    this.totalQuantity = parseInt(this.quantity);
    this._getProduct(this.productId);
  }



  ngOnInit() {
  }

  async _getProduct(id) {
    let loading = await this.loadingController.create({
      message: "Fetching details..."
    })
    await loading.present();
   this.getProductSub =   this.productService.getProductById(id).subscribe(async (product) => {
      console.log(product['products']);
      this.product = product['products'];
      this.title = product['products']['title'];
      this.itemImage = product['products']['imageUrl'];
      this.price = product['products']['price'];
      this.discountPrice = product['products']['discountedPrice'];
      this.cartService.addProduct(this.product, parseInt(this.quantity));
      this.cart = this.cartService.getCart();


      await loading.dismiss();

    }, async (error) => {
      console.log(error);
      await loading.dismiss();

    })
  }


  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.discountedPrice * j.amount, 0);
  }

  setToday() {
    this.formattedString = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'), 'MM d, yyyy')
    const date = new Date();
    const today = new Date();

    this.dateTillDisabled = today.toISOString().substring(0, 10);
    let d = this.monthList[date.getMonth()];
    console.log("the month " + date.getMonth());
    this.selectedMonth = date.getMonth() + 1;

  }

  dateChanged(dates) {
    console.log(dates.detail.value);
    this.date = dates.detail.value;


    let days = this.date.length;
    let amount = this.getTotal() * this.quantity * days;
    console.log(this.date);
    console.log(days);
    console.log(this.getTotal());
    console.log(`quantity: ${this.quantity}`);


    console.log(`Amount to be paid is ${amount}`);
    this.totalAmount = amount;

    // this.startDate = value;
    // this.dateValue = value
    // this.formattedString = format(parseISO(value), ' MMM d,yyyy')
    // this.showPicker = false

  }


  async placeOrder() {
    let loading = await this.loadingController.create({
      message: "Placing Order..."
    });

    await loading.present();
    let cart = this.cartService.getCart();
    let cartTotal = this.totalAmount;
    let userId = this.userId;


    console.log(`${JSON.stringify(cart)} userId: ${userId} cartTotal: ${cartTotal}`);
    let body = {
      products: cart,
      productId: this.productId,
      total: cartTotal,
      userId: userId,
      address: this.activeSelectedAddress,
      pincode: this.orderPincode,
      status: "Order Placed",
      isCustom: true,
      startDate: this.date[0],
      endDate: this.date[this.date.length - 1],
      days: this.date,
      daysRemaining: this.date.length

    }

   this.placeOrderSub =  this.http.post(environment.Url + '/cart', body)
      .subscribe(cart => {
        console.log(cart);
        let cartId = cart['cartId'];

        this.createCartOrdersSub =    this.http.put(environment.Url + `/cart/order/${cartId}`,{})
        .subscribe(async (cart) =>{
         console.log(cart);
         console.log("ORDERS CRAETED SUCCESSFULLY");
       //Money is succcessfully Deducted from user Wallet
      //Place order here
  
      await loading.dismiss();
      this.handler.presentToast("Custom Order Placed Successfully!", 3000, 'top');
      // this.walletService.amount.next(amount);
      // this.router.navigate(['payment'], { skipLocationChange: true });


        }, async(error) =>{
         console.log(error);
         await loading.dismiss();
         this.handler.presentToast('Something Went Wrong!', 2000, 'top');

         
        })


      }, (error) => {
        console.log(error);
        // this.isCanvasHidden = true;
        


      })

  }


}
