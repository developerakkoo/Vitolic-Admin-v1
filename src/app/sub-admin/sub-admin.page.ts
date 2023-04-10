import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.page.html',
  styleUrls: ['./sub-admin.page.scss'],
})
export class SubAdminPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  addSubAdmin(){
    this.router.navigate(['sub-admin', 'create']);
  }
}
