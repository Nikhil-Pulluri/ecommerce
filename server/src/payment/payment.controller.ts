import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Public } from 'src/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService){}

  @Public() // can be removed later on
  @Post('create-order')
  @ApiOperation({ summary: 'Create a payment order' })
  @ApiBody({ 
    description: 'Payment order details', 
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', description: 'The amount to be paid' },
        currency: { type: 'string', description: 'The currency of the payment' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The order has been created successfully', type: Object })
  async createOrder(
    @Body() data : {amount : number, currency : string}
  ) : Promise<{message : string}>
  {
    return this.paymentService.createOrder(data.amount, data.currency);
  }

  @Public()
  @Post('verify-payment')
  @ApiOperation({ summary: 'Verify a payment' })
  @ApiBody({ 
    description: 'Payment verification details',
    schema: {
      type: 'object',
      properties: {
        paymentId: { type: 'string', description: 'The ID of the payment to verify' },
        orderId: { type: 'string', description: 'The ID of the associated order' },
        signature: { type: 'string', description: 'The signature for verifying the payment' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Payment verification result', type: Object })
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
