import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  ionicForm: FormGroup;

  isSubmitted = false;
  file: File;

 
  
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      category: ['', [Validators.required]],
      file: ['', [Validators.required, ] ]
    })
  }
  get errorControl() {
    return this.ionicForm.controls;
  }

  fileEvent(ev){
    console.log(ev.target.files);
    
    this.file = ev.target.files[0];
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
    }

    let formdata = new FormData();

    formdata.append("file", this.file, this.file.name);

  }


  
}
