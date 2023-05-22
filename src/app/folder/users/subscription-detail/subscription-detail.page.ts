import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, IonDatetime, ActionSheetController, LoadingController } from '@ionic/angular';
import { parseISO, format, differenceInDays, add } from 'date-fns';
import * as moment from 'moment';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CartService, Product } from 'src/app/cart.service';
import { HandlerService } from 'src/app/handler.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.page.html',
  styleUrls: ['./subscription-detail.page.scss'],
})
export class SubscriptionDetailPage implements OnInit {

  form!: FormGroup;
  cart: Product[] = [];

  userId:any;
  productId:any;

  categories = [];
  selectedAddress: any[];
  activeSelectedAddress;
  selete: any;
  age = 0;
  totalAmount: number;
  subType: string = "Daily";
  isPromoApplied:boolean = false;
  promoCode:string;
  promoMaxDiscountValue: number;

  userWalletBalance: number;
  mobileNumber;

  d1;
  d2;
  d3;
  
  // name = 'Angular 4';
  // someValue = 0;

  @ViewChild(IonModal) modal: IonModal;
  message: any;
  // name: string;
  totalCartCount: BehaviorSubject<number>;

  public items: Array<string>;
  itemImage: any;
  product;
  title;
  price;
  discountPrice;
  itemCount;
  isPrint: boolean = true;
  hasDiscountedPrice: boolean;
  show = false;
  buttonName = 'Show';
  monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  selectedMonth;
  dateTillDisabled;
  addressSelectText:string = "Select Address";
  quantity;

  isNormal: boolean;
  isAlternate: boolean;
  isCustom: boolean;
  isOneTime: boolean;
  isSubOrderNeeded: boolean;

  hideStartDate: boolean = false;
  hideEndDate: boolean = false;
  enableCustomButton: boolean = false;
  orderPincode;

  hide: any;
  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;


  modes = ['date', 'date-time', 'month', 'month-year', 'time', 'time-date', 'year'];
  selectMode = 'date';
  showPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd');
  startDate;
  endDate;
  normalDays: any[] = [];
  altDays: any[] = [];
  formattedString = '';
  @ViewChild(IonDatetime) datetime: IonDatetime;

  daysRemaining;



  myFlagForSlideToggle: boolean = true;
  //hiding info box
  visible: boolean = false;

  isCanvasHidden: boolean = false;

  getUserProfileSub: Subscription;
  createOrderSub: Subscription;
  placeOrderSub: Subscription;
  getProductSub: Subscription;
  userProfileSub: Subscription;
  userAddSub: Subscription;
  createCartOrdersSub: Subscription;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private fb: FormBuilder,
              private handler: HandlerService,
              private actionSheetController: ActionSheetController,
              private loadingController: LoadingController
              ,
              private cartService: CartService) {
               
               }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.cart = this.cartService.getCart();
    this._getProduct(this.productId);
    this.totalAmount = this.getTotal() * 30;
    console.log(`UserId: ${this.userId}`);
    console.log(`ProductId ${this.productId}`);
    console.log(this.cart);
    this.getUserAddress();
  }


  ionViewDidLeave() {
    this.cartService.clearCart();
    console.log("Product detail left");
    this.createOrderSub.unsubscribe();
    this.placeOrderSub.unsubscribe();
    this.getProductSub.unsubscribe();
    this.userProfileSub.unsubscribe();
    this.userAddSub.unsubscribe();
    this.createCartOrdersSub.unsubscribe();
  }

  async presentLoading(msg:string,) {
    const loading = await this.loadingController.create({
      message: msg,
    });
    await loading.present();
  }
  getUserAddress() {
    this.userAddSub = this.http.get(environment.Url + '/address/user/'+ this.userId).subscribe((add) => {
      console.log(add);
      this.selectedAddress = add['add']

    }, (error) => {
      console.log(error);
      this.handler.presentToast('Something went wrong!', 3000, 'top');
    })
  }


  async _getProduct(id) {
 this.presentLoading("Fetching Product details");
    this.getProductSub = this.http.get(environment.Url + '/products/' + id).subscribe(async (product) => {
      console.log(product['products']);
      this.product = product['products'];
      this.hasDiscountedPrice = product['products']['hasDiscountedPrice']
     console.log(`Has DiscountedPrice ${this.hasDiscountedPrice}`);
     
      this.loadingController.dismiss();


    }, async (error) => {
      console.log(error);
       this.loadingController.dismiss();

      this.handler.presentToast("Error Fetching Product Details!", 2000, 'top');


    })
  }
  addQuantity(){
    this.cartService.addProduct(this.product, this.quantity);
    console.log(this.cart);
    
  }

  decreaseCartItem(product) {
    if (product.amount == 1) {
      return;
    }
    this.quantity = product.amount;
    this.cartService.decreaseProduct(product, 1);
    this.getTotal();
    console.log(this.subType);
    if (this.subType == "Daily") {
      this.totalAmount = this.getTotal() * this.normalDays.length;
      this.daysRemaining = this.normalDays.length;

    }
    else if (this.subType == "Alternate") {
      this.totalAmount = this.getTotal() * this.altDays.length;
      this.daysRemaining = this.altDays.length;


    }
    else if (this.subType == "One time") {
      this.totalAmount = this.getTotal() * 1;
      this.daysRemaining = 1;

    }

  }

  increaseCartItem(product) {

    this.cartService.addProduct(product, 1);
    this.getTotal();
    this.quantity = product.amount;

    console.log(this.subType);
    if (this.subType == "Daily") {
      this.totalAmount = this.getTotal() * this.normalDays.length;
      this.daysRemaining = this.normalDays.length;


    }
    else if (this.subType == "Alternate") {
      this.totalAmount = this.getTotal() * this.altDays.length;
      this.daysRemaining = this.altDays.length;

    }
    else if (this.subType == "One time") {
      this.totalAmount = this.getTotal() * 1;
      this.daysRemaining = 1

    }


  }

  removeCartItem(product) {
    this.cartService.removeProduct(product);

  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.discountedPrice * j.amount, 0);
  }

  

  // async openAddressPage() {

  //   const modal = await this.modalController.create({
  //     component: AddressPage,
  //     showBackdrop: true,
  //     handle: true,
  //     canDismiss: true,

  //   });
  //   modal.present();

  //   const { data, role } = await modal.onWillDismiss();
  //   modal.onDidDismiss().then(async (value) => {
  //     // console.log(`modal dismissed`);
  //     this.addressService.getUserAddress(this.userId).subscribe((add) => {
  //       console.log(add);
  //       this.selectedAddress = add['add'];

  //     }, (error) => {
  //       console.log(error);

  //     })
  //     // this.selectedAddress = await this.addressService.getUserSelectedAddress();
  //     // this.totalAmount = this.getTotal() * 15
  //     //     this.Checkout(this.getTotal() * 15);

  //   }).catch((error) => {
  //     console.log(error);

  //   })
  //   if (role === 'confirm') {
  //     console.log("dismissed pressed");

  //   }


  // }
  async presentActionSheet() {
    console.log(this.selectedAddress);
    let addressArray = []

    this.selectedAddress.forEach(element => {
      console.log(element['useradd']);
      addressArray.push({
        text: element['addLine1'] + ", " + element['addLine2'] + ", " + element['society'] + ".",
        icon: "map",
        handler: () => {
          console.log(element._id);
          this.activeSelectedAddress = element._id;
          this.orderPincode = element['pincode'];
          this.addressSelectText = "Address Selected";
          
          // this.placeOrderEvent();

        }
      })

    });
    const actionSheet = await this.actionSheetController
      .create({
        header: 'Select Address',
        buttons: addressArray,
        mode: 'ios'
      });

    await actionSheet.present();

  }
  async placeOrder() {
    this.handler.presentLoading("Creating Order...")
    let cart = this.cartService.getCart();
    let cartTotal = this.totalAmount;
    // console.log(`CART TOTAL:- ${cartTotal}`);

    let daysRemain = this.daysRemaining;


    if (this.subType == "Daily") {
      this.isNormal = true;
      this.isAlternate = false;
      this.isCustom = false;
      this.isOneTime = false;
      this.isSubOrderNeeded = true;
    }
    if (this.subType == "Alternate") {
      this.isNormal = false;
      this.isAlternate = true;
      this.isCustom = false;
      this.isOneTime = false;
      this.isSubOrderNeeded = true;

    }
    if (this.subType == "One time") {
      daysRemain = 1;
      this.isNormal = false;
      this.isAlternate = false;
      this.isCustom = false;
      this.isOneTime = true;
      this.isSubOrderNeeded = false;

    }
    let body = {
      products: cart,
      productId: this.productId,
      discountedPrice: this.discountPrice,
      total: cartTotal,
      userId: this.userId,
      address: this.activeSelectedAddress,
      pincode: this.orderPincode,
      status: "Order Placed",
      isNormal: this.isNormal,
      isAlternate: this.isAlternate,
      isCustom: this.isCustom,
      isOneTime: this.isOneTime,
      startDate: this.startDate,
      endDate: this.endDate,
      daysRemaining: this.daysRemaining
    }

    console.log("THE BODY OF ORDER -----");

    console.log(body);


    this.placeOrderSub = this.http.post(environment.Url + '/cart', body)
      .subscribe(cart => {
        console.log(cart);
        let cartId = cart['cartId'];
        this.cartService.clearCart();
       
      if(this.isSubOrderNeeded){
              this.createCartOrdersSub =    this.http.put(environment.Url + `/cart/order/${cartId}`,{})
              .subscribe(async (cart) =>{
               console.log(cart);
               console.log("ORDERS CRAETED SUCCESSFULLY");
               
                //Place order here
                this.handler.dismissLoading();
              
                //Send sms of order placed
                this.handler.presentAlert("Success", "Order Placed For User Successfully!");
    
   
              }, async(error) =>{
               console.log(error);
                this.handler.dismissLoading();
               
              })
            }


           if(!this.isSubOrderNeeded){
            console.log("ORDERS CRAETED SUCCESSFULLY");
            this.handler.dismissLoading();

           }
          
        
      }, (error) => {
        console.log(error);
        // this.isCanvasHidden = true;
        this.handler.presentToast('Something went wrong!', 3000, 'top');



      })

  }


  // async placeOrderDeducting(amount) {
  // this.handler.presentLoading("Placing Order...")
  //   let cart = this.cartService.getCart();
  //   let daysRemain = this.daysRemaining;
  //   let cartTotal = this.totalAmount;

  //   if (this.subType == "Daily") {
  //     this.isNormal = true;
  //     this.isAlternate = false;
  //     this.isCustom = false;
  //     this.isOneTime = false;
  //     this.isSubOrderNeeded = true;
  //   }
  //   if (this.subType == "Alternate") {
  //     this.isNormal = false;
  //     this.isAlternate = true;
  //     this.isCustom = false;
  //     this.isOneTime = false;
  //     this.isSubOrderNeeded = true;
  //   }
  //   if (this.subType == "One time") {
  //     daysRemain = 1;
  //     this.isNormal = false;
  //     this.isAlternate = false;
  //     this.isCustom = false;
  //     this.isOneTime = true;
  //     this.isSubOrderNeeded = false;
  //   }
  //   console.log(`${JSON.stringify(cart)} userId: ${this.userId} cartTotal: ${cartTotal}`);
  //   let body = {
  //     products: cart,
  //     productId: this.productId,
  //     discountedPrice: this.discountPrice,
  //     total: cartTotal,
  //     userId: this.userId,
  //     address: this.activeSelectedAddress,
  //     pincode: this.orderPincode,

  //     status: "Order Placed",
  //     isNormal: this.isNormal,
  //     isAlternate: this.isAlternate,
  //     isCustom: this.isCustom,
  //     isOneTime: this.isOneTime,
  //     startDate: this.startDate,
  //     endDate: this.endDate,
  //     daysRemaining: this.daysRemaining
  //   }

  //   console.log(body);

  //   this.placeOrderSub = this.http.post(environment.Url + '/cart', body)
  //     .subscribe(cart => {
  //       console.log(cart);
  //       let cartId = cart?.['cartId'];
  //       this.cartService.clearCart();
  //       // this.isCanvasHidden = true;
  //       this.userProfileSub = this.profile.updateUserWallet(amount, this.userId)
  //       .subscribe(async (isPlaced) => {
          
  //           //Money is succcessfully Deducted from user Wallet
  //           this.createCartOrdersSub =    this.http.put(environment.Url + `/cart/order/${cartId}`,{})
  //           .subscribe(async (cart) =>{
  //            console.log(cart);
  //            console.log("ORDERS CRAETED SUCCESSFULLY");
             
  //             //Place order here
  //             await this.handler.dismissLoading();
  //             //Send sms of order placed
  //             this.router.navigate(['payment'], { skipLocationChange: true });
  
 
  //           }, async(error) =>{
  //            console.log(error);
  //            await this.handler.dismissLoading();
 
             
  //           })
          
  //         if(!this.isSubOrderNeeded){
  //           console.log("ORDERS CRAETED SUCCESSFULLY");
               
  //           //Place order here
  //           await this.handler.dismissLoading();
  //           //Send sms of order placed
  //           this.router.navigate(['payment'], { skipLocationChange: true });

  //          }
  //       }



  //     }, (error) => {
  //       console.log(error);
  //       // this.isCanvasHidden = true;
  //       this.handler.presentToast('Something went wrong!', 3000, 'top');

  //     })

  // }
  
  async openCustomPage() {
    this.subType = "Custom";
    this.router.navigate(['folder', 'users', 'custom', this.productId, this.quantity, this.activeSelectedAddress, this.userId]);
  }

  close() {
    this.datetime.cancel(true);
  }



  toggle() {
    this.show = !this.show;

    if (this.show) {
      this.buttonName = 'Date'
      console.log(this.show)
    }
    else {
      this.buttonName = 'Show'
    }
  }


  setToday() {
    this.formattedString = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'), 'MM d, yyyy')
    const date = new Date();
    const today = new Date();
    today.setDate(new Date().getDate() + 1);
    this.dateTillDisabled = today.toISOString().substring(0, 10);

    var currentDate = moment().add(1, 'd').format('YYYY-MM-DD');
    var futureMonth = moment().add(30, 'd').format('YYYY-MM-DD');

    console.log(`Today Date:- ${currentDate}`);
    console.log(`30+ Date:- ${futureMonth}`);

    this.startDate = currentDate;
    this.endDate = futureMonth;
    for (var m = moment(this.startDate); m.isSameOrBefore(this.endDate); m.add(1, 'days')) {
      this.normalDays.push(m.format('YYYY-MM-DD'));
    }

    console.log(this.normalDays);


    this.totalAmount = this.getTotal() * this.normalDays.length;
    this.daysRemaining = this.normalDays.length;


    let d = this.monthList[date.getMonth()];
    console.log("the month " + date.getMonth());
    this.selectedMonth = date.getMonth() + 1;

  }
  switchEvent(ev) {
    console.log(ev.detail.value);
    this.subType = ev.detail.value;
    this.normalDays = [];
    this.altDays = [];



    if (this.subType == "One time") {
      this.totalAmount = this.getTotal() * 1;

      this.subType == "One time";
      this.hideEndDate = true;
      this.enableCustomButton = false;

      this.hideStartDate = false;
    }
    if (this.subType == "Daily") {
      for (var m = moment(this.startDate); m.isSameOrBefore(this.endDate); m.add(1, 'days')) {
        this.normalDays.push(m.format('YYYY-MM-DD'));
      }
      this.totalAmount = this.getTotal() * this.normalDays.length;
      this.subType == "Daily";
      this.daysRemaining = this.normalDays.length;


      console.log(this.normalDays);

      this.hideEndDate = false;
      this.hideStartDate = false;
      this.enableCustomButton = false;

    }
    if (this.subType == "Alternate") {
      this.subType == "Alternate";
      for (var m = moment(this.startDate); m.isSameOrBefore(this.endDate); m.add(1, 'days')) {
        this.normalDays.push(m.format('YYYY-MM-DD'));
      }

      //console.log

      this.altDays = this.normalDays.filter(function (v, i) {
        // check the index is odd
        return i % 2 == 0;
      });

      console.log(this.altDays);
      this.totalAmount = this.getTotal() * this.altDays.length;
      this.daysRemaining = this.altDays.length;

      this.hideEndDate = false;
      this.hideStartDate = false;
      this.enableCustomButton = false;

    }

    if (this.subType == "Custom") {
      this.enableCustomButton = true;
      this.hideEndDate = true;
      this.hideStartDate = true;
    }

  }

  dateChangedStart(value) {
    console.log(value);
    this.normalDays = [];
    this.altDays = [];
    this.startDate = value.split("T")[0];
    this.dateValue = value;
    console.log(`start date:- ${this.startDate}`);
    console.log(this.subType);
    if (this.subType == "Daily") {
      var currentDate = moment(value).format('YYYY-MM-DD');
      // var futureMonth = moment(value).add(1, 'M').format('YYYY-MM-DD');
      this.startDate = currentDate;
      // this.endDate = futureMonth;
      for (var m = moment(this.startDate); m.isSameOrBefore(this.endDate); m.add(1, 'days')) {
        this.normalDays.push(m.format('YYYY-MM-DD'));
      }
      console.log(this.normalDays);

      this.totalAmount = this.getTotal() * this.normalDays.length;
      this.daysRemaining = this.normalDays.length;
      this.formattedString = format(parseISO(value), ' MMM d,yyyy');
      this.showPicker = false;
      this.toggle();
    }


    if (this.subType == "Alternate") {
      var currentDate = moment(value).format('YYYY-MM-DD');
      // var futureMonth = moment(value).add(1, 'M').format('YYYY-MM-DD');
      this.startDate = currentDate;
      // this.endDate = futureMonth;
      for (var m = moment(this.startDate); m.isSameOrBefore(this.endDate); m.add(1, 'days')) {
        this.normalDays.push(m.format('YYYY-MM-DD'));
      }
      this.altDays = this.normalDays.filter(function (v, i) {
        // check the index is odd
        return i % 2 == 0;
      });

      console.log(this.altDays);
      this.totalAmount = this.getTotal() * this.altDays.length;
      this.daysRemaining = this.altDays.length;
      this.formattedString = format(parseISO(value), ' MMM d,yyyy');
      this.showPicker = false;
      this.toggle();
    }

    if (this.subType == "One time") {
      var currentDate = moment(value).format('YYYY-MM-DD');
      // var futureMonth = moment(value).add(1, 'M').format('YYYY-MM-DD');
      this.startDate = currentDate;
      // this.endDate = futureMonth;



      this.totalAmount = this.getTotal() * 1;
      this.formattedString = format(parseISO(value), ' MMM d,yyyy');
      this.showPicker = false;
      this.toggle();
    }


  }

  dateChangedEnd(value) {
    // console.log(value);
    this.endDate = value.split("T")[0];
    this.dateValue = value;
    this.normalDays = [];
    this.altDays = [];


    if (this.subType == "Daily") {
      var currentDate = moment(this.startDate).format('YYYY-MM-DD');
      var futureMonth = moment(this.endDate).format('YYYY-MM-DD');
      this.startDate = currentDate;
      this.endDate = futureMonth;
      for (var m = moment(this.startDate); m.isSameOrBefore(this.endDate); m.add(1, 'days')) {
        this.normalDays.push(m.format('YYYY-MM-DD'));
      }
      console.log("Nomral days in end daily");

      console.log(this.normalDays);

      this.totalAmount = this.getTotal() * this.normalDays.length;
      this.daysRemaining = this.normalDays.length;
      this.formattedString = format(parseISO(value), ' MMM d,yyyy');
      this.showPicker = false;
      this.toggle();
    }


    if (this.subType == "Alternate") {
      var currentDate = moment(this.startDate).format('YYYY-MM-DD');
      var futureMonth = moment(this.endDate).format('YYYY-MM-DD');
      this.startDate = currentDate;
      this.endDate = futureMonth;
      for (var m = moment(this.startDate); m.isSameOrBefore(this.endDate); m.add(1, 'days')) {
        this.normalDays.push(m.format('YYYY-MM-DD'));
      }
      this.altDays = this.normalDays.filter(function (v, i) {
        // check the index is odd
        return i % 2 == 0;
      });

      console.log(this.altDays);
      this.totalAmount = this.getTotal() * this.altDays.length;
      this.daysRemaining = this.altDays.length;
      this.formattedString = format(parseISO(value), ' MMM d,yyyy');
      this.showPicker = false;
      this.toggle();
    }

    if (this.subType == "One time") {
      var currentDate = moment(this.startDate).format('YYYY-MM-DD');
      this.startDate = currentDate;

      this.totalAmount = this.getTotal() * 1;
      this.formattedString = format(parseISO(value), ' MMM d,yyyy');
      this.showPicker = false;
      this.toggle();
    }


  }
}
