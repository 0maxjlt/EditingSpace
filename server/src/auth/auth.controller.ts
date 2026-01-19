import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';
import { UsersService } from 'src/users/users.service';
import { User } from 'generated/prisma/browser';

interface UserInfo {
  email: string;
  password: string;
}

interface SignInData {
  userId: number;
  accessToken: string;
  username: string;
}


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(PassportJwtAuthGuard)
  @Get('me')
  getUserInfo(@Req() request: any): UserInfo {
    console.log('User info requested:', request.user);
    return request.user;
  }
  
  @Post('login')
  @UseGuards(PassportLocalGuard)
  async login(@Request() req): Promise<SignInData> {
    return this.authService.signIn(req.user);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<SignInData> {
    return this.authService.register(createUserDto);
  }

}
