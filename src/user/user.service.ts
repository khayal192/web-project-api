import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

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
}
