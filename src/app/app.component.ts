import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Products', url: '/folder/product', icon: 'leaf' },
    { title: 'Orders', url: '/folder/order', icon: 'today' },
    { title: 'Users', url: '/folder/users', icon: 'person' },
    { title: 'Delivery Boys', url: '/folder/deliver-boy', icon: 'bicycle' },
    { title: 'Promo', url: '/folder/coupon', icon: 'gift' },
    { title: 'Banner', url: '/folder/banner', icon: 'image' },
    { title: 'Subscription', url: '/folder/subscription', icon: 'cash' },
    { title: 'Total City', url: '/folder/total-city', icon: 'map' },
    // { title: 'App Update', url: '/folder/appupdate', icon: 'build' },
    { title: 'Issues', url: '/folder/issues', icon: 'warning' },
    { title: 'Privacy Policy', url: '/folder/policy', icon: 'document' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

 public isAuth: boolean = false;
  constructor(private auth: AngularFireAuth,
    private router: Router) {}


  logout(){
    this.auth.signOut().then((value) =>{
      console.log(value);
      this.isAuth = true;
      this.router.navigate(['auth']);
      
    })
  }
}
