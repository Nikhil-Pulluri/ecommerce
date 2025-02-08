import { Controller, Post, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart, CartProduct } from '@prisma/client';
import { Public } from 'src/decorators/public.decorator';


@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Public() // remove later
  @Post('create-cart')
  async createCart(
    @Body() data : {
      userId : string
    }
  ) : Promise<Cart> {
    return this.cartService.createCart(data)
  }


  @Public() // remove this dec later
  @Post('add-item')
  async addItemToCart(
    @Body() data : {
      cartId : string,
      productId : string,
      quantity : number,
    }
  ) : Promise<CartProduct> {
    return this.cartService.addItemToCart(data)
  }

  @Public() // remove this dec later
  @Get('get-cartbyid/:id')
  async getCartById(
    @Param('id') id : string
  ) : Promise<Cart>  
  {
    return this.cartService.getCartById(id)
  }

  @Public()
  @Put('update-quantity/:cartProductId')
  async updateQuantity(
    @Body() data : {
       quantity : number,
    },
    @Param('cartProductId') cartProductId : string
  ) : Promise<CartProduct> {
    return this.cartService.updateQuantity({
      id : cartProductId, data})
  }

  @Public() // remove this dec later
  @Get('cart-total/:cartId')
  async getCartTotal(
    @Param('cartId') cartId : string
  ) : Promise<number> {
    return this.cartService.cartTotal(cartId)
  }

  @Public() // remove this dec later
  @Delete('clear-cart/:cartId')
  async clearCart(
    @Param('chartId') cartId : string
  ) : Promise<{massage : string}> {
    return this.cartService.clearCart(cartId)
  }



}
