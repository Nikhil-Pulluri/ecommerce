import { Controller, Get, Body, Post, Delete, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { User, Prisma } from '@prisma/client';
import { Public } from 'src/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private userService : UserService){}

  @Public()
  @Get()
  async getUser(
     userWhereUniqueInput : Prisma.UserWhereUniqueInput
  ) : Promise<User>
  {
    return this.userService.user(userWhereUniqueInput);
  }

  @Public()
  @Post("create-user")
  async createUser(
    @Body() data : {email : string, name : string, password : string, role : string}
  ) : Promise<User> {
    return this.userService.createUser(data);
  }


  @Put("update-user")
  async updateUser(
    @Body() params : {where : Prisma.UserWhereUniqueInput, data : Prisma.UserUpdateInput}
  ) : Promise<User>{
    return this.userService.updateUser(params);
  }


  @Delete('delete-user')
  async deleteUser(
    @Body() data : {email : string}
  ) : Promise<{message : string}> {
    return this.userService.deleteUser(data);
  }

}
