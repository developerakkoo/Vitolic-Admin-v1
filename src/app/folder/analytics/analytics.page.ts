import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { BaseChartDirective } from 'ng2-charts';
// import Chart from 'chart.js/auto';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {

  single:any[] = 
    [
      {
        "name": "Daily",
        "value": 100
      },
      {
        "name": "Alternate",
        "value": 40
      },
      {
        "name": "One Time",
        "value":100
      },
        {
        "name": "Custom",
        "value": 600
      }
  ];

  singlebar:any[] = [
    {
      "name": "23-08-2022",
      "value": 20
    },
    {
      "name": "24-04-2022",
      "value": 50
    },
    {
      "name": "25-03-2022",
      "value": 72
    }
  ];
  view: any[] = [700, 400];
  viewbar: any[] = [700, 400];

   // options
   showXAxis = true;
   showYAxis = true;
   showXAxisLabel = true;
   xAxisLabel = 'Date';
   showYAxisLabel = true;
   yAxisLabel = 'Order Placed';
  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'above';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  userCount;
  boyCount;
  totalEarning;
  monthlyEarning;

  orders:any[];

  public chartjs: any;

  liveUserSub: Subscription;
  liveBoySub: Subscription;
  totalEarningSub: Subscription;
  monthlyEarningSub: Subscription;

  orderByDateSub: Subscription;


  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';


  // @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  constructor(private http: HttpClient,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private toastController: ToastController) { }

  ngOnInit() {
    
    this.getLiveUsers();
    this.getDeliveryBoys();
    this.getTotalEarnings();
    this.getEarningsByMonth();
    this.getOrdersByDate();
  }

  ionViewDidLeave(){
    this.liveBoySub.unsubscribe();
    this.liveUserSub.unsubscribe();
    this.orderByDateSub.unsubscribe();
    this.totalEarningSub.unsubscribe();
    this.monthlyEarningSub.unsubscribe();
  }

 

  getLiveUsers(){
    this.liveUserSub = this.http.get(environment.Url + '/dashboard/users')
    .subscribe((user) =>{
      console.log(user);
      this.userCount = user['users'];
      
    },(error) =>{
      console.log(error);
      
    })

  }

  getDeliveryBoys(){
    this.liveBoySub = this.http.get(environment.Url + '/dashboard/boys')
    .subscribe((user) =>{
      console.log(user);
      this.boyCount = user['boy'];
      
    },(error) =>{
      console.log(error);
      
    })
  }

  getTotalEarnings(){
    this.totalEarningSub = this.http.get(environment.Url +'/dashboard/earning')
    .subscribe((earning) =>{
      console.log(earning);
      this.totalEarning = earning['total'];
      
    }, (error) =>{
      console.log(error);
      
    })
  }


  getEarningsByMonth(){
    this.monthlyEarningSub = this.http.get(environment.Url +'/dashboard/sortearnings')
    .subscribe((earning) =>{
      console.log(earning['result'][0]);
      this.monthlyEarning = earning['result'][0]['earnings'];
      
    }, (error) =>{
      console.log(error);
      
    })
  }


  getOrdersByDate(){
    this.orderByDateSub = this.http.get(environment.Url +'/dashboard/getOrdersByCreatedAt')
    .subscribe((data) =>{
      console.log(data);
      this.orders = data['cart'];
    }, (error) =>{
      console.log(error);
      
    })
  }

}
