import { Component, OnInit, Input } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

   userRole = "";
  
  constructor(private router : Router) { 
    
    try {
      var decoded = jwt_decode(localStorage.getItem("token"));
      this.userRole = decoded.Roles;
    }
    catch
    {
      this.userRole = 'NonRegistred';
    }
  }

  ngOnInit(): void {
  }

  Logout()
  {
    localStorage.removeItem('token'); //
    this.router.navigate(['/sign-in']);
  }

}
