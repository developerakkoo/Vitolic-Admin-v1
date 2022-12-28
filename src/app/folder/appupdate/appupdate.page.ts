import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appupdate',
  templateUrl: './appupdate.page.html',
  styleUrls: ['./appupdate.page.scss'],
})
export class AppupdatePage implements OnInit {


  appUpdateForm: FormGroup;
  
  appUpdateSub: Subscription;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.appUpdateForm = this.fb.group({
      version: [1.0, [Validators.required]],
      title: ['New features available', [Validators.required]]
    })
  }

  ionViewDidEnter(){

  }


  ionViewDidLeave(){
     
  }
}
