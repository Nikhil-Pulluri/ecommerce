import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from '@prisma/client';
import { Public } from 'src/decorators/public.decorator';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  // @Public()
  // @Post('add-item/:id')
  // async addItem(
  //   @Body 
  // )


}
