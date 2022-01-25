import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css']
})
export class UserWishlistComponent implements OnInit {

  wishListArr = [
    {name: "Oppo a", price: "$12", description: "Some text about the mobile.."},
    {name: "Oppo b", price: "$13", description: "Some text about the mobile.."},
    {name: "Oppo c", price: "$14", description: "Some text about the mobile.."},
    {name: "Oppo d", price: "$15", description: "Some text about the mobile.."},
    {name: "Oppo a", price: "$12", description: "Some text about the mobile.."},
    {name: "Oppo b", price: "$13", description: "Some text about the mobile.."},
    {name: "Oppo c", price: "$14", description: "Some text about the mobile.."},
    {name: "Oppo d", price: "$15", description: "Some text about the mobile.."}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
