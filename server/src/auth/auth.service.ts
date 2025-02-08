import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor( private userService : UserService,
               private jwtService : JwtService
               ) {}

  async signIn(email : string, password : string) : Promise<{access_token : string}> {
    const user = await this.userService.user({email});

    if(user.email === email && user.password === password) {
      

      const payload = { sub : user.id, username : user.name};

      return {
        access_token : await this.jwtService.signAsync(payload),
      }

      
    }

    else throw new UnauthorizedException();
  }
}
