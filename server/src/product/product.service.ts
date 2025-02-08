import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';
import { Prisma } from '@prisma/client';


@Injectable()
export class ProductService {
  constructor(private prisma : PrismaService) {}

  async createProduct(data : Prisma.ProductCreateInput) : Promise<Product> {
    return await this.prisma.product.create({data});
  }

  async getProductById(
    id : string
  ) : Promise<Product> {
    return await this.prisma.product.findUnique({where : {id : id}});
  }

  async listProduct(
    id : string
  ) : Promise<Product[]> {
    return await this.prisma.product.findMany(
      {
        where : {
          id : id
        }
      }
    );
  }

  async updateProduct(params : {where : Prisma.ProductWhereUniqueInput, data : Prisma.ProductUpdateInput}) : Promise<Product> {
    const { where, data } = params;
    return await this.prisma.product.update({
      where,
      data,
    });
  }


  async searchFilter(
      data : {query : string, min : number, max : number}
  ) : Promise<Product[]>
   {

    const {query, min, max} = data;
    return await this.prisma.product.findMany({
      where : {
        name : {
          contains : query
        },
        price : {
          gte : min, lte : max
        },
      }
    })
   }

   async searchCat(
    cat : string
   ) : Promise<Product[]> {
    return this.prisma.product.findMany({
      where : {
        cat : cat
      }
    })  
   }
   

  async deleteProduct(
    id : string
  ) : Promise<{message : string}> {
    const deleteP =  await this.prisma.product.delete({where : {id : id}});

    try{
      if(deleteP){
        return {message : "Product deleted successfully"};
    }
    }
    catch(error){
      return {message : "Product not found"};
    }
  }


  
}





