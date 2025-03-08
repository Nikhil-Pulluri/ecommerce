import { Controller, Get, Body, Post, Delete, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { User, Prisma } from '@prisma/client';
import { Public } from 'src/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private userService : UserService){}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get user by unique identifier' })
  @ApiParam({ name: 'userWhereUniqueInput', description: 'Unique identifier for the user' })
  @ApiResponse({ status: 200, description: 'User found', type: Object })
  async getUser(
     userWhereUniqueInput : Prisma.UserWhereUniqueInput
  ) : Promise<User>
  {
    return this.userService.user(userWhereUniqueInput);
  }

  @Public()
  @Post("create-user")
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'User creation details',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name of the user' },
        email: { type: 'string', description: 'Email address of the user' },
        password: { type: 'string', description: 'Password for the user account' },
        role: { type: 'string', description: 'Role assigned to the user' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User has been successfully created', type: Object })
  async createUser(
    @Body() data : {name : string, email : string, password : string, role : string}
  ) : Promise<User> {
    console.log('create user called')
    return this.userService.createUser(data);
  }

  @Put("update-user")
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiBody({
    description: 'User update details',
    schema: {
      type: 'object',
      properties: {
        where: { 
          type: 'object',
          properties: {
            email: { type: 'string', description: 'Email of the user to update' },
          },
        },
        data: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Updated name of the user' },
            password: { type: 'string', description: 'Updated password for the user' },
            role: { type: 'string', description: 'Updated role of the user' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User has been updated successfully', type: Object })
  async updateUser(
    @Body() params : {where : Prisma.UserWhereUniqueInput, data : Prisma.UserUpdateInput}
  ) : Promise<User>{
    return this.userService.updateUser(params);
  }

  @Delete('delete-user')
  @ApiOperation({ summary: 'Delete a user by email' })
  @ApiBody({
    description: 'Email of the user to be deleted',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: 'Email address of the user to delete' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User has been deleted', type: Object })
  async deleteUser(
    @Body() data : {email : string}
  ) : Promise<{message : string}> {
    return this.userService.deleteUser(data);
  }
}
