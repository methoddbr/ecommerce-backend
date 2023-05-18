import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/enum-type.enum';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { passwordHash, validatePassword } from '../utils/validatePassword';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadRequestException(`Email already registered in system.`);
    }
    const passwordHashed = await passwordHash(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: UserType.User,
      password: passwordHashed,
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
  async findUserByEmail(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`Email not found: ${email}`);
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

  async updatePasswordUser(
    updatePasswordUserDto: UpdatePasswordDto,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const passwordHashed = await passwordHash(
      updatePasswordUserDto.newPassword,
    );
    const isMatch = await validatePassword(
      updatePasswordUserDto.lastPassword,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException(`Last password invalid.`);
    }

    return this.userRepository.save({
      ...user,
      password: passwordHashed,
    });
  }
}
