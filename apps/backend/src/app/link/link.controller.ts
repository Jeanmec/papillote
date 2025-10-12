import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '~/app/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '~/app/common/jwt/jwt-auth.guard';
import { UserEntity } from '~/entities/user.entity';
import {
  ValidateGeneratedIdDto,
  CreateLinkRequestDto,
  RespondToLinkRequestDto,
} from '@papillote/validation';
import { LinkService } from './link.service';

interface AuthenticatedRequest {
  user: UserEntity;
}

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post('validate-id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(ValidateGeneratedIdDto))
  async validateGeneratedId(
    @Body() dto: { generatedId: string; pseudo?: string }
  ) {
    return await this.linkService.validateGeneratedId(
      dto.generatedId,
      dto.pseudo
    );
  }

  @Post('send-request')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(CreateLinkRequestDto))
  async sendLinkRequest(
    @Body() dto: { targetGeneratedId: string; pseudo: string },
    @Request() req: AuthenticatedRequest
  ) {
    const userId = req.user.mobileId;
    return await this.linkService.createLinkRequest(userId, dto);
  }

  @Post('answer-request')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(RespondToLinkRequestDto))
  async respondToLinkRequest(
    @Body() dto: { requestId: number; accept: boolean; pseudo?: string },
    @Request() req: AuthenticatedRequest
  ) {
    console.log({ dto });
    const userId = req.user.mobileId;
    return await this.linkService.respondToLinkRequest(userId, dto);
  }

  @Get('my-links')
  @UseGuards(JwtAuthGuard)
  async getMyLinks(@Request() req: AuthenticatedRequest) {
    const userId = req.user.mobileId;
    return await this.linkService.getUserLinks(userId);
  }
}
