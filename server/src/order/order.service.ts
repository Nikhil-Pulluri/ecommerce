import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, OrderProduct } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data : {
    orderId : string,
    productId : string,
    quantity : number,
  }) : Promise<OrderProduct> {
    return this.prisma.orderProduct.create({
      data
    })
  }

  async getOrderById(id : string) : Promise<Order> {
    return this.prisma.order.findUnique({
      where : {
        id : id
      }
    })
  }

  async listOrders(
    data : {
      userId : string,
    }
  ) : Promise<Order[]> {
    return this.prisma.order.findMany({
      where : {
        userId : data.userId
      },
      include : {
        orderProducts : {
          include : {product : true}
        }
      }
    });
  } 


  async updateOrder(
    params : {
      id : string,
      data : {
        quantity : number
      }
    }
  ) : Promise<OrderProduct> {
    const {data} = params
    return this.prisma.orderProduct.update({
      where : {
        id : params.id
      },
      data, 
    })
  }

  async calculateTotal(orderId: string): Promise<number> {
    const orderProducts = await this.prisma.orderProduct.findMany({
      where: { orderId },
      include: { product: true },
    });
  
    return orderProducts.reduce((total, op) => total + op.product.price * op.quantity, 0);
  }
  
  async checkOutOrder(
    data : {
      orderId : string,
    }
  ) : Promise<{message : string}>
  {
    const total = await this.calculateTotal(data.orderId);
    // call the payment api here      -- my bank account

    try{

    }
    catch(error)
    {
      return {message : "Order not placed due to payment issue"}
    }

  }

  async cancelOrder(id : string) : Promise<Order> {
    const deleteOrderProducts = await this.prisma.orderProduct.deleteMany({
      where : {
        orderId : id
      }
    })

    try{
      if(deleteOrderProducts) {
        return this.prisma.order.delete({
          where : {
            id : id
          }
        })
      }
    }
    catch (error) {
      throw error
    }
  }


}
