import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [CartModule],
  providers: [UserService, PrismaService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
