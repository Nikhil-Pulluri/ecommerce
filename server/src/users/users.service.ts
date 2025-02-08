
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService,
    private cartService : CartService) {}


  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {

    const user = await this.prisma.user.findUnique({
      where : {
        email : data.email
      }
    })

    if(user)
    {
      return user;
    }

    // return this.prisma.user.create({
    //   data,
    // });

    const newUser = await this.prisma.user.create({
      data,
    })

    const {id} = newUser;

    const cartStatus = await this.cartService.createCart({userId : id});


    if(cartStatus) {
      return newUser;
    }
    
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(data: { email: string }): Promise<{ message: string }> {
    try {
      const deleteU = await this.prisma.user.delete({
        where: {
          email: data.email,
        },
      });
  
      if (deleteU) {
        return { message: "User deleted successfully" };
      }
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
  
}
