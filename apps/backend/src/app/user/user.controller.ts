import {
  Controller,
  Get,
  Post,
  UsePipes,
  Body,
  UseGuards,
  Req,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '~/app/user/user.service';
import { ZodValidationPipe } from '~/app/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '~/app/common/jwt/jwt-auth.guard';
import { UserEntity } from '~/entities/user.entity';
import {
  ClientDto,
  CreateUserSchema,
  ResetAccountSchema,
  LoginSchema,
} from '@papillote/validation';
import type {
  LoginDto,
  LoginResponseDto,
  ResetAccountDto,
} from '@papillote/validation';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @Req() req: Request & { user?: UserEntity }
  ): Promise<ClientDto> {
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
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async createUser(@Body() body: LoginDto): Promise<LoginResponseDto> {
    return this.userService.signUp(body);
  }

  @Post('/login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    return this.userService.login(body);
  }

  @Get('/check/:mobileId')
  async check(@Param('mobileId') mobileId: string): Promise<boolean> {
    return this.userService.checkUserExistence(mobileId);
  }

  @Post('/forgot')
  @UsePipes(new ZodValidationPipe(ResetAccountSchema))
  async ForgotPassword(@Body() body: ResetAccountDto): Promise<boolean> {
    return this.userService.resetUser(body);
  }
}
