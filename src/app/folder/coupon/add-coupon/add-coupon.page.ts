import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.page.html',
  styleUrls: ['./add-coupon.page.scss'],
})
export class AddCouponPage implements OnInit {
  ionicForm: FormGroup;

  isSubmitted = false;
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
     this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      file: ['', [Validators.required, ] ]
    })
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
