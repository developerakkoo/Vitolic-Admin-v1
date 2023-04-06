import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeliverBoyService } from './deliver-boy.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-deliver-boy',
  templateUrl: './deliver-boy.page.html',
  styleUrls: ['./deliver-boy.page.scss'],
})
export class DeliverBoyPage implements OnInit {
  Delivers:any[] =[];
  getDeliverBoySub: Subscription;
  constructor(private DeliverSer:DeliverBoyService, private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllDeliver()
  }
  openEditPage(delivers){
    console.log(delivers._id);
    this.router.navigate(['folder','deliver-boy','edit-deliver-boy', delivers._id]);
    
  }

  openAddDeliverBoyPage(){
    this.router.navigate(['add-boy']);
  }
  IonViewDidLeave(){
    this.getDeliverBoySub.unsubscribe();
  }

  async getAllDeliver(){
    
    let loading = await this.loadingController.create({
      message:"Loading Delivery Boy...",
      spinner:"lines"
    })
    await loading.present();
    this.getDeliverBoySub = this.DeliverSer.getAllDeliver()
    .subscribe(async(Deliver:any) =>{
      
      console.log(Deliver);
      this.Delivers = Deliver['boy'];
      await loading.dismiss();
    },
     async (error)=>{
      console.log(error);
      
      await loading.dismiss();
    })
  }


  deleteboyClick(id){
    this.DeliverSer.deleteDeliver(id)
    .subscribe(async (product) =>{
      console.log(product);
      this.getAllDeliver();
      
    }, async (error) =>{
      console.log(error);
      
    })
  }
}
