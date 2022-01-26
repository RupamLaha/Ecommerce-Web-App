import { Component, OnInit } from '@angular/core';
import { OrderedProduct } from 'src/app/DataModel/OrderedProducts/ordered-product';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.css']
})
export class UserOrderHistoryComponent implements OnInit {

  orderHistoryArr: OrderedProduct[] = []

  showEmptyIcon: boolean = true

  constructor(private ecomService: EcommerceService) { }

  ngOnInit(): void {
    this.orderHistoryArr = this.ecomService.getUserOrderHistory()

    if(this.orderHistoryArr.length === 0){
      this.showEmptyIcon = true
    }else{
      this.showEmptyIcon = false
    }

  }

}
