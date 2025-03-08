import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma, Product } from '@prisma/client';
import { Public } from 'src/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private productService : ProductService ) {}

  @Public()
  @Post('create-product')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({
    description: 'Product creation details',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'The name of the product' },
        description: { type: 'string', description: 'A brief description of the product' },
        price: { type: 'number', description: 'Price of the product' },
        categoryId: { type: 'string', description: 'Category ID for the product' },
        stockQuantity: { type: 'number', description: 'Quantity of the product in stock' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Product has been created successfully', type: Object })
  async createProduct(
    @Body() data : Prisma.ProductCreateInput
  ) : Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Public() // testing purpose only
  @Get('list-product/:id')
  @ApiOperation({ summary: 'Get a list of products by category ID' })
  @ApiParam({ name: 'id', description: 'ID of the category to list products from' })
  @ApiResponse({ status: 200, description: 'List of products in the category', type: [Object] })
  async listProducts(
    @Param('id') id : string
  ) : Promise<Product[]> {
    return this.productService.listProduct(id);
  }

  @Public()
  @Put('update-product')
  @ApiOperation({ summary: 'Update a product' })
  @ApiBody({
    description: 'Product update details',
    schema: {
      type: 'object',
      properties: {
        where: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier for the product' },
          },
        },
        data: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Updated product name' },
            description: { type: 'string', description: 'Updated product description' },
            price: { type: 'number', description: 'Updated product price' },
            stockQuantity: { type: 'number', description: 'Updated stock quantity' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Product has been updated successfully', type: Object })
  async updateProduct(
    @Body() params : {where: Prisma.ProductWhereUniqueInput, data : Prisma.ProductUpdateInput}
  ) : Promise<Product> {
    return this.productService.updateProduct(params);
  }

  @Public()
  @Post('search-products')
  @ApiOperation({ summary: 'Search products by query and price range' })
  @ApiBody({
    description: 'Search criteria for products',
    schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query for product names or descriptions' },
        min: { type: 'number', description: 'Minimum price' },
        max: { type: 'number', description: 'Maximum price' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'List of products matching search criteria', type: [Object] })
  async searchFilter(
    @Body() data : {query : string, min : number, max : number}
  ) : Promise<Product[]> {
    return this.productService.searchFilter(data);
  }

  @Public()
  @Post('search-cat')
  @ApiOperation({ summary: 'Search products by category' })
  @ApiBody({
    description: 'Category search criteria',
    schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query for category' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'List of products in the category', type: [Object] })
  async searchCat(
    @Body() data : {query : string}
  ) : Promise<Product[]> {
    return this.productService.searchCat(data.query);
  }

  @Public()
  @Delete('delete-product')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiBody({
    description: 'Product ID to delete',
    schema: {
      type: 'object',
      properties: {
        where: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier for the product to be deleted' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Product has been deleted successfully', type: Object })
  async deleteProduct(
    @Body() params : {
      where : Prisma.ProductWhereUniqueInput,
    }
  ) : Promise<{message : string}> {
    const {id} = params.where;
    return this.productService.deleteProduct(id);
  }
}
