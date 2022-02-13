import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'wowShop';
  currentRoute: string = "";
  currentRouteBool: boolean = false;

  showAdminNavOptions: boolean = false;

  showUserNavOptions: boolean = false;

  navBarOpen = false;

  constructor(private router: Router){
      
  }

  ngOnInit(): void {

    //to get the url link and check it is seller link or user link...
    this.router.events.subscribe(value => {
      var temp = this.router.url.toString()
      temp = temp.substring(1, temp.indexOf("-"))
      this.currentRoute = temp
      if(this.currentRoute === "seller"){
        // if current link is of seller show seller navbar by making currentRouteBool true...
        this.currentRouteBool = true;
      }else{
        // if current link is of user show user navbar by making currentRouteBool false...
        this.currentRouteBool = false;
      }


      let tempAdminRole = localStorage.getItem("adminRole");

      if(tempAdminRole == "admin"){
        this.showAdminNavOptions = true
      }else{
        this.showAdminNavOptions = false
      }

      //conditions to whether to show the user navbar options...
      let tempUserRole = localStorage.getItem("role");

      if(tempUserRole == "user"){
        this.showUserNavOptions = true
      }else{
        this.showUserNavOptions = false
      }
      // console.log(temp);
    })
  }

  toggleNav(){
    this.navBarOpen = !this.navBarOpen
  }
}
