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
  userId = localStorage.getItem('id')

  showEmptyIcon: boolean = true

  constructor(private ecomService: EcommerceService) { }

  ngOnInit(): void {
    this.ecomService.getUserOrderHistory(this.userId).subscribe((response)=>{

      console.log(response)

      if(response.message.length > 0){

        for(let prod of response.message){
          let desc = prod.description
          let orderId = prod.id
          let prodName = prod.name
          let orderStatus = prod.orderstatus
          let price = prod.price
          let prodId = prod.prodid
          let quantity = prod.quantity
          let userId = prod.userid

          let orderedProd = new OrderedProduct(prodId, prodName, price, desc, orderStatus, quantity)

          this.orderHistoryArr.push(orderedProd)
        }

        this.showEmptyIcon = false

      }else{
          this.showEmptyIcon = true
      }
    })
  }

}
