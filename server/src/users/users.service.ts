import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '../../generated/prisma/client';


@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}


  // Création d'un nouvel utilisateur
  async create(createUserDto: CreateUserDto): Promise<User | null> {

    const email = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (email) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
    return user

  }

  // Récupération de tous les utilisateurs
  async findAll() {
    return await this.prisma.user.findMany();
  }

  // Récupération d'un utilisateur par son ID
  async findOne(id: number) {

    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    return user ;
  }

  // Mise à jour d'un utilisateur existant
  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.prisma.user.update({
      where: { id: id },
      data: {
        ...updateUserDto,
      },
    });

    return user;
  }

  // Suppression d'un utilisateur par son ID
  async remove(id: number) {

    const user = await this.prisma.user.delete({
      where: { id: id },
    });

    return user;
  }
}
