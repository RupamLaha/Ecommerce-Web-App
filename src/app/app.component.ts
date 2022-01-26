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

  constructor(private router: Router){
      
  }

  ngOnInit(): void {
    this.router.events.subscribe(value => {
      var temp = this.router.url.toString()
      temp = temp.substring(1, temp.indexOf("-"))
      this.currentRoute = temp
      if(this.currentRoute === "seller"){
        this.currentRouteBool = true;
      }else{
        this.currentRouteBool = false;
      }

      let tempAdminEmail = localStorage.getItem("adminEmail");

      if(tempAdminEmail === "laha@gmail.com"){
        this.showAdminNavOptions = true
      }else{
        this.showAdminNavOptions = false
      }

      let tempUserEmail = localStorage.getItem("email");

      if(tempUserEmail !== null){
        this.showUserNavOptions = true
      }else{
        this.showUserNavOptions = false
      }
      // console.log(temp);
    })
  }
}
