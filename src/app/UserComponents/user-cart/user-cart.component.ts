import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  cartArr = [
    {name: "Oppo a", price: "$12", description: "Some text about the mobile.."},
    {name: "Oppo b", price: "$13", description: "Some text about the mobile.."},
    {name: "Oppo c", price: "$14", description: "Some text about the mobile.."},
    {name: "Oppo d", price: "$15", description: "Some text about the mobile.."}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
