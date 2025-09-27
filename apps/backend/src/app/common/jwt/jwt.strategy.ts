import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '~/entities/user.entity';
import { Request } from 'express';

interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req) {
            if (req.cookies && req.cookies.auth_token) {
              return req.cookies.auth_token;
            } else if (req.headers.authorization) {
              return req.headers.authorization.replace('Bearer ', '');
            }
          }
          return null;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET', 'changeme'),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { sub } = payload;
    const user = await this.usersRepository.findOne({
      where: { generatedId: sub },
    });
    if (!user) {
      throw new UnauthorizedException('Login first to access this resource');
    }
    return user;
  }
}
