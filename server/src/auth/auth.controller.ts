import { Controller, HttpCode, Post, HttpStatus, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.gaurd';
import { Public } from 'src/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger/dist';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary : "make validation of the user creds",
  })
  @ApiResponse({
    status : 200,
    description : "User creds validated"
  })
  @ApiBody({ 
    description: 'User creds incoming',
    schema : {
      type : 'object',
      properties : {
        email : {type : 'string', description : "email of the user"},
        password : {type : 'string', description : "password of the user"}
      }
    }})
  signIn(
    @Body() signInDto: { email: string; password: string },
  ){
    console.log("login route called")
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({
    summary : "gets the profile of a user after log in"
  })
  getProfile(@Request() req)
  {
    return req.user
  }
}
