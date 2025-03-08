import { Controller, Post, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart, CartProduct } from '@prisma/client';
import { Public } from 'src/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger/dist';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Public() // remove later
  @Post('create-cart')
  @ApiOperation({
    summary: "Create a new shopping cart",
    description: "This endpoint creates a new cart for a user identified by the userId."
  })
  @ApiBody({
    description: "The userId of the user who is creating the cart.",
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', description: 'The unique identifier of the user.' },
      },
      required: ['userId'],
    },
  })
  async createCart(
    @Body() data: { userId: string }
  ): Promise<Cart> {
    return this.cartService.createCart(data);
  }

  @Public() // remove this dec later
  @Post('add-item')
  @ApiOperation({
    summary: "Add an item to the shopping cart",
    description: "This endpoint adds a product to the user's cart with a specified quantity."
  })
  @ApiBody({
    description: "Details of the cart item to be added.",
    schema: {
      type: 'object',
      properties: {
        cartId: { type: 'string', description: 'The unique identifier of the cart' },
        productId: { type: 'string', description: 'The unique identifier of the product to add' },
        quantity: { type: 'number', description: 'The quantity of the product to add to the cart' },
      },
      required: ['cartId', 'productId', 'quantity'],
    },
  })
  async addItemToCart(
    @Body() data: { cartId: string, productId: string, quantity: number }
  ): Promise<CartProduct> {
    return this.cartService.addItemToCart(data);
  }

  @Public() // remove this dec later
  @Get('get-cartbyid/:id')
  @ApiOperation({
    summary: "Get cart by ID",
    description: "This endpoint retrieves the details of a cart based on its unique ID."
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the cart to fetch'
  })
  async getCartById(
    @Param('id') id: string
  ): Promise<Cart> {
    return this.cartService.getCartById(id);
  }

  @Public() 
  @Put('update-quantity/:cartProductId')
  @ApiOperation({
    summary: "Update product quantity in the cart",
    description: "This endpoint allows updating the quantity of a product in the user's cart."
  })
  @ApiParam({
    name: 'cartProductId',
    required: true,
    description: 'The unique identifier of the cart product'
  })
  @ApiBody({
    description: "The new quantity of the product in the cart.",
    schema: {
      type: 'object',
      properties: {
        quantity: { type: 'number', description: 'The updated quantity of the product' },
      },
      required: ['quantity'],
    },
  })
  async updateQuantity(
    @Body() data: { quantity: number },
    @Param('cartProductId') cartProductId: string
  ): Promise<CartProduct> {
    return this.cartService.updateQuantity({
      id: cartProductId,
      data,
    });
  }

  @Public() // remove this dec later
  @Get('cart-total/:cartId')
  @ApiOperation({
    summary: "Get the total price of the cart",
    description: "This endpoint calculates and returns the total price of the items in the cart."
  })
  @ApiParam({
    name: 'cartId',
    required: true,
    description: 'The unique identifier of the cart to get the total of'
  })
  async getCartTotal(
    @Param('cartId') cartId: string
  ): Promise<number> {
    return this.cartService.cartTotal(cartId);
  }

  @Public() // remove this dec later
  @Delete('clear-cart/:cartId')
  @ApiOperation({
    summary: "Clear all items in the cart",
    description: "This endpoint removes all items from the cart, essentially emptying it."
  })
  @ApiParam({
    name: 'cartId',
    required: true,
    description: 'The unique identifier of the cart to be cleared'
  })
  @ApiResponse({
    status: 200,
    description: 'The cart has been successfully cleared.',
  })
  async clearCart(
    @Param('cartId') cartId: string
  ): Promise<{ message: string }> {
    return this.cartService.clearCart(cartId);
  }
}
