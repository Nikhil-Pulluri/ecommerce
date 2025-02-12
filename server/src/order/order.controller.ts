import { Controller, Post, Body, Param, Get, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order, OrderProduct } from '@prisma/client';
import { Public } from 'src/decorators/public.decorator';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Public()
  @Post('createorder')
  async createOrder(
    @Body() data : {
      orderId : string,
      productId : string,
      quantity : number,
    }
  ) : Promise<OrderProduct> {
    return this.orderService.createOrder(data);
  }



  @Public()
  @Get(':id')
  async getOrderById(@Param('id') id : string) : Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Public()
  @Get('list-orders')
  async listOrders(@Body() data : {userId : string}) : Promise<Order[]> {
    return this.orderService.listOrders(data);
  }

  @Public()
  @Put('update-order')
  async updateOrder(@Body() params : {id : string, data : {quantity : number}}) : Promise<OrderProduct> {
    return this.orderService.updateOrder(params);
  }

  @Public()
  @Get('total/:id')
  async calculateTotal(@Param('id') id : string) : Promise<number> {
    return this.orderService.calculateTotal(id);
  }


  @Public()
  @Post('checkout-order')
  async checkOutOrder(@Body() data : {orderId : string}) : Promise<{message : string}> {
    return this.orderService.checkOutOrder(data);
  }

  @Public()
  @Delete(':id')
  async cancelOrder(@Param('id') id : string) : Promise<Order> {
    return this.orderService.cancelOrder(id);
  }

}
