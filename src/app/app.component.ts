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
      console.log(temp);
    })
  }
}
