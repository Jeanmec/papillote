import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigService } from './jwt.config';
import { UserEntity } from '../../entities/user.entity';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AvatarEntity } from '../../entities/avatar.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AvatarEntity]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, JwtConfigService],
})
export class UserModule {}
