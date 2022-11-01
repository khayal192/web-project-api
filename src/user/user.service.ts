import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUsersDto } from './dto/update.users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new HttpException(
        `This users not find ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return findUser;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`POST NOT FOUND`);
    }

    if (user.id === userId) {
      await this.userRepository.remove(user);
      return;
    }

    throw new BadRequestException(`USER IS NOT CREATOR POST`);
  }

  async updateUser(
    updateUsersDto: UpdateUsersDto,
    userId: number,
  ): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('not user');
    }
    user.username = updateUsersDto.username;
    user.email = updateUsersDto.email;
    user.password = await bcrypt.hash(updateUsersDto.password, 10);

    return await this.userRepository.save(user);
  }
}
