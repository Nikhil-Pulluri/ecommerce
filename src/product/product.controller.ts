import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma, Product } from '@prisma/client';
import { Public } from 'src/decorators/public.decorator';

@Controller('product')
export class ProductController {
  constructor(private productService : ProductService ) {}

  @Public()
  @Post('create-product')
  async createProduct(
    @Body() data : Prisma.ProductCreateInput
  ) : Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Public() // testing purpose only
  @Get('list-product/:id')
  async listProducts(
    @Param('id') id : string
  ) : Promise<Product[]> {
    return this.productService.listProduct(id);
  }
  
  @Public()
  @Put('update-product')
  async updateProduct(
    @Body() params : {where: Prisma.ProductWhereUniqueInput, data : Prisma.ProductUpdateInput}
  ) : Promise<Product> {
    return this.productService.updateProduct(params);
  }

  @Public()
  @Post('search-products')
  async searchFilter(
    @Body() data : {query : string, min : number, max : number}
  ) : Promise<Product[]>
   {
    return this.productService.searchFilter(data);
  }


  @Public()
  @Delete('delete-product')
  async deleteProduct(
    @Body() params : {
      where : Prisma.ProductWhereUniqueInput,
    }
  ) : Promise<{message : string}> {
    const {id} = params.where;
    return this.productService.deleteProduct(id)
  }




}
