import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { parse } from 'pg-connection-string';
import { UserEntity } from '~/entities/user.entity';
import { AvatarEntity } from '~/entities/avatar.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL');
        const parsed = parse(dbUrl || '');

        if (!parsed.host || !parsed.port || !parsed.database || !parsed.user) {
          throw new Error('Invalid DATABASE_URL');
        }

        return {
          type: 'postgres',
          host: parsed.host,
          port: parseInt(parsed.port, 10),
          username: parsed.user,
          password: parsed.password,
          database: parsed.database,
          entities: [UserEntity, AvatarEntity],
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
