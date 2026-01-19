import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { validate } from 'class-validator';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

interface InputInfo {
  email: string;
  password: string;
}

interface AuthResponse {
  userId: number;
  username: string;
}

interface SignInData {
  userId: number;
  accessToken: string;
  username: string;
}

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService, 
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  

  async login(input: InputInfo): Promise<SignInData> {

    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException('Invalid registration details');
    } 

    return this.signIn(user);

  }


  async validateUser(userInfo: InputInfo): Promise<AuthResponse | null> {

    const user = await this.prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (!user || user.password !== userInfo.password) {
      return null;
    }

    return { userId: user.id, username: user.username};
  }

  async signIn(user: AuthResponse): Promise<SignInData> {

    const tokenPayload = {
      sub: user.userId,
      username: user.username
    }

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      userId: user.userId,
      accessToken: accessToken,
      username: user.username,
    };
  }

  async register(dto: CreateUserDto) : Promise<SignInData> {

    const user = await this.usersService.create(dto);
    
    if (!user) {
      throw new UnauthorizedException('Registration failed');
    } 

    return this.signIn({ userId: user.id, username: user.username });

  }

}
