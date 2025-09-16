import {
  Controller,
  Get,
  Post,
  UsePipes,
  Body,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

import {
  createUserSchema,
  AuthCredentialsDto,
  UserProfileDto,
  LoginResponseDto,
} from '@papillote/validation';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserEntity } from '../../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @Req() req: Request & { user?: UserEntity }
  ): Promise<UserProfileDto> {
    const user = req.user;
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      generatedId: user.generatedId,
      avatar: user.avatar,
    };
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() body: AuthCredentialsDto) {
    return this.userService.signUp(body);
  }

  @Post('login')
  async login(@Body() body: AuthCredentialsDto): Promise<LoginResponseDto> {
    return this.userService.login(body);
  }
}
