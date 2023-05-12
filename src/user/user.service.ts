import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const salt10Rounds = 10;
    const passwordHash = await hash(createUserDto.password, salt10Rounds);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: passwordHash,
    });
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  async findUserById(userId: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`UserId not found: ${userId}`);
    }
    return user;
  }
  async getUserByIdUsinRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }
}
