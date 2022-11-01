import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from '../user/dto/create.users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(username);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        return rest;
      } else {
        throw new UnauthorizedException(`AUTHORIZATION_ERROR`);
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration(createUserDto: CreateUsersDto) {
    const userDb = await this.findByEmail(createUserDto.email);
    if (userDb) {
      throw new HttpException(
        `${createUserDto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const users = new UserEntity();
    users.email = createUserDto.email;
    users.username = createUserDto.username;
    users.password = await bcrypt.hash(createUserDto.password, 10);
    const saveUser = await this.usersRepository.save(users);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userResponse } = saveUser;
    return userResponse;
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
