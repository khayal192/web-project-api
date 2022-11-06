import { Module } from '@nestjs/common';
import { BannedService } from './banned.service';
import { BannedController } from './banned.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { BannedListEntity } from './banned.list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BannedListEntity])],
  controllers: [BannedController],
  providers: [BannedService],
})
export class BannedModule {}
