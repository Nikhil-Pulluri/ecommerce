import { Controller, Post, Body, Param, Get, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order, OrderProduct } from '@prisma/client';
import { Public } from 'src/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Public() 
  @Post('createorder')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ 
    description: 'Order creation details', 
    schema: {
      type: 'object',
      properties: {
        orderId: { type: 'string', description: 'Unique identifier for the order' },
        productId: { type: 'string', description: 'Unique identifier for the product being ordered' },
        quantity: { type: 'number', description: 'Quantity of the product to be ordered' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The order has been successfully created', type: Object })
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
  @ApiOperation({ summary: 'Get order details by order ID' })
  @ApiParam({ name: 'id', description: 'ID of the order to fetch details for' })
  @ApiResponse({ status: 200, description: 'The details of the order', type: Object })
  async getOrderById(@Param('id') id : string) : Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Public() 
  @Get('list-orders')
  @ApiOperation({ summary: 'List orders by user ID' })
  @ApiBody({ 
    description: 'User ID to filter orders',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', description: 'Unique identifier for the user whose orders are being listed' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'List of orders for the user', type: Array })
  async listOrders(@Body() data : {userId : string}) : Promise<Order[]> {
    return this.orderService.listOrders(data);
  }

  @Public() 
  @Put('update-order')
  @ApiOperation({ summary: 'Update order quantity' })
  @ApiBody({ 
    description: 'Order quantity update details',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Order product ID to be updated' },
        data: {
          type: 'object',
          properties: {
            quantity: { type: 'number', description: 'New quantity of the ordered product' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The order quantity has been updated', type: Object })
  async updateOrder(@Body() params : {id : string, data : {quantity : number}}) : Promise<OrderProduct> {
    return this.orderService.updateOrder(params);
  }

  @Public() 
  @Get('total/:id')
  @ApiOperation({ summary: 'Calculate total price for an order' })
  @ApiParam({ name: 'id', description: 'ID of the order to calculate the total price for' })
  @ApiResponse({ status: 200, description: 'Total price of the order', type: Number })
  async calculateTotal(@Param('id') id : string) : Promise<number> {
    return this.orderService.calculateTotal(id);
  }


  @Public() 
  @Post('checkout-order')
  @ApiOperation({ summary: 'Checkout an order' })
  @ApiBody({ 
    description: 'Order ID to checkout',
    schema: {
      type: 'object',
      properties: {
        orderId: { type: 'string', description: 'The order ID to be checked out' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The order has been successfully checked out', type: Object })
  async checkOutOrder(@Body() data : {orderId : string}) : Promise<{message : string}> {
    return this.orderService.checkOutOrder(data);
  }

  @Public() 
  @Delete(':id')
  @ApiOperation({ summary: 'Cancel an order by order ID' })
  @ApiParam({ name: 'id', description: 'ID of the order to cancel' })
  @ApiResponse({ status: 200, description: 'The order has been canceled', type: Object })
  async cancelOrder(@Param('id') id : string) : Promise<Order> {
    return this.orderService.cancelOrder(id);
  }

}
