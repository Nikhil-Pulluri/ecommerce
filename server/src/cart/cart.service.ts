import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cart, CartProduct } from '@prisma/client';
import { ProductService } from 'src/product/product.service';
@Injectable()
export class CartService {
  constructor(private prisma : PrismaService,
    private productService : ProductService) {}

  async createCart( data : {userId : string}) : Promise<Cart> {
    return await this.prisma.cart.create({data})
  }

  async addItemToCart(
    data : {
      cartId : string,
      productId : string,
      quantity : number,
    }
  ) : Promise<CartProduct> {
    return  await this.prisma.cartProduct.create({
      data
    })
  }

  async getCartById(
    id : string
  ) : Promise<Cart> {
    return await this.prisma.cart.findUnique({
      where : {
        id : id,
      },
       include : {
         cartItems : {
          include : {
            product : true
          }
         }
       }
    })
  }


  async updateQuantity(
    params : {
      id : string,
      data : {
        quantity : number,
      }
    }
  ) : Promise<CartProduct> {
    const {id, data} = params
    return await this.prisma.cartProduct.update({
      where : {
        id : params.id
      }, data
    })
  }

  

  async cartTotal(
    cartId : string
  ) : Promise<number> {
    const response : CartProduct[] = await this.prisma.cartProduct.findMany({
      where : {
        cartId : cartId
      }
    })

    let total = 0;

    for (let i = 0; i < response.length; i++) {
      let productId = response[i].productId;
      const product = await this.productService.getProductById(productId);
      total += product.price * response[i].quantity;
    }

    return total;
  }

  async StartPlacingOrder(
    data : {
      userId : string,
    }) : Promise<{message : string}> {
      const order = await this.prisma.order.create({
        data,
      });

      try{
        if(order) {
          return {message : "Order placed successfully"};
        }
      }
      catch (error) {
        return {message : "Order not placed"};
      }

    }

  async removeItemFromCart( // change this later - not implemented yet
    cartProductId : string
  ) : Promise<{massage : string}> {
    const response = await this.prisma.cartProduct.delete({
      where : {
        id : cartProductId
      }
    })

    try { 
      if(response) {  
        return {massage : "Item removed successfully"}; 
      }
    }
    catch (error) {
      return {massage : "Item not found"}
    } 
  }


  async clearCart(
    cartId : string
  ) : Promise<{message : string}> {
    const clearTheCart = await this.prisma.cartProduct.deleteMany({
      where : {
        cartId : cartId
      }
    })

    try {
      if(clearTheCart) {
        return {message : "Cart cleared successfully"};
      }
    }
    catch (error) {
      return {message : "Cart not found"};
    }
  }



}
