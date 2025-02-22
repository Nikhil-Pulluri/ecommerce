import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService){}

  @Public() // can be removed later on
  @Post('create-order')
  async createOrder(
    @Body() data : {amount : number, currency : string}
  ) : Promise<{message : string}>
  {
    return this.paymentService.createOrder(data.amount, data.currency);
  }

  @Public()
  @Post('verify-payment')
  async verifyPayment(
    @Body() data : {
      paymentId : string,
      orderId : string,
      signature : string
    } 
  ) : Promise<{
    status : string,
    message : string
  }> {
    return this.paymentService.verifyPayment(data);
  }


}
