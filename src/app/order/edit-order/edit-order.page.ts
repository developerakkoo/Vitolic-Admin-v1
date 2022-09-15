import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OrderServiceService } from '../order-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.page.html',
  styleUrls: ['./edit-order.page.scss'],
})
export class EditOrderPage implements OnInit {
  OrderEdit: FormGroup;
  constructor(private carts: OrderServiceService,public formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, 
    ) { }

  ngOnInit() {
    this.OrderEdit = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      file:['',Validators.required]

    })
  }

}
