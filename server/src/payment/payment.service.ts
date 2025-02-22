import { Injectable } from '@nestjs/common';
// import * as Razorpay from 'razorpay'
const Razorpay = require('razorpay');
import crypto from 'crypto';


@Injectable()
export class PaymentService {
   private razorpay : typeof Razorpay;

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
      console.log(order)
      return {
        message : "Order created successfully",
      }
    }
    else {
      return {
        message : "Order not created",

      }
    }

  }

  async verifyPayment(data : {paymentId : string, orderId : string,signature : string})
   : Promise<{status : string,message : string}> {
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac('sha256', secret);
    const {orderId, paymentId, signature} = data
    hmac.update(orderId + "|" + paymentId);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
      return { status: "success", message: "Payment verified" };
    } else {
      throw new Error("Payment verification failed");
    }

  
  }





}
