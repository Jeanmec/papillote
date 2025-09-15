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

import { UserEntity } from '../../entities/user.entity';
import { UserService } from './user.service';

import { createUserSchema } from '@papillote/validation';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request & { user?: UserEntity }) {
    const user = req.user;
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      generatedId: user.generatedId,
      mobileId: user.mobileId,
      avatarUrl: user.avatar,
    };
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() body: { mobileId: string; password: string }) {
    return this.userService.signUp(body);
  }

  @Post('login')
  async login(@Body() body: { mobileId: string; password: number }) {
    return this.userService.login(body);
  }
}
