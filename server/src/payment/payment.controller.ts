import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService){}

  @Post('create-order')
  async createOrder(
    @Body() data : {amount : number, currency : string}
  ) : Promise<{message : string}>
  {
    return this.paymentService.createOrder(data.amount, data.currency);
  }

}
