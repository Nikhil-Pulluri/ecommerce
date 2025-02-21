import { Injectable } from '@nestjs/common';
import Razorpay from 'razorpay';

@Injectable()
export class PaymentService {
   private razorpay : Razorpay;

  constructor(){
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })
  }


  async createOrder(amount: number, currency: string) {
    const options = {
      amount: amount * 100, 
      currency,
      payment_capture: 1,
    };

    const order = await this.razorpay.orders.create(options);

    if(order)
    {
      return {
        message : "Order created successfully"
      }
    }
    else {
      return {
        message : "Order not created",

      }
    }

  }


  


}
