import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CityService } from './city.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-total-city',
  templateUrl: './total-city.page.html',
  styleUrls: ['./total-city.page.scss'],
})
export class TotalCityPage implements OnInit {
  TotalCity:any[] =[];
  getTotalCitys: Subscription;
  constructor(private totalcity: CityService, private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllTotalCity();
  }
  openAddCityPage(){
    this.router.navigate(['folder', 'total-city', 'add-city']);
  }
  openEditPage(TotalCity){
    console.log(TotalCity._id);
    this.router.navigate(['folder','total-city','edicity', TotalCity._id]);
    
  }


  IonViewDidLeave(){
    this.getTotalCitys.unsubscribe();
  }
  async  getAllTotalCity(){
    let loading = await this.loadingController.create({
      message:"Loading cities...",
    })

    await loading.present();
    this.getTotalCitys = this.totalcity.getAllCity()
    .subscribe(async(city:any) =>{
      console.log(city);
      this.TotalCity = city['pincode'];
      await loading.dismiss();
    }, async (error)=>{
      console.log(error);
      await loading.dismiss();
      
    })
    }



    deleteTotalCityClick(id){
      this.totalcity.deleteCity(id)
      .subscribe(async (product) =>{
        console.log(product);
        this.getAllTotalCity();
        
      }, async (error) =>{
        console.log(error);
        
      })
    }
}
